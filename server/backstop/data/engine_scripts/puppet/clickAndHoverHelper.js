module.exports = async (page, scenario, vp, config = {}) => {
  const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector;
  let clickSelector = scenario.clickSelectors || scenario.clickSelector;
  const clickSelectorMobile = scenario.clickSelectorsMobile || scenario.clickSelectorMobile;
  const keyPressSelector = scenario.keyPressSelectors || scenario.keyPressSelector;
  const scrollToSelector = scenario.scrollToSelector;
  const postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]
  const betweenSelectorInteractionWait = scenario.betweenSelectorInteractionWait; // selector [str] | ms [int]
  const readyTimeout = scenario.readyTimeout || config.readyTimeout || 30000;

  const waitForVisualState = async (context, selector) => {
    const waitForLoadedState = () => context.waitForFunction(selector => {
      const isVisuallyRelevant = image => {
        for (let element = image; element; element = element.parentElement) {
          const style = getComputedStyle(element);
          if (style.display === 'none' || style.visibility === 'hidden') {
            return false;
          }
        }
        return true;
      };
      const elements = [...document.querySelectorAll(selector)];
      const images = elements.flatMap(element =>
        element.matches('img') ? [element] : [...element.querySelectorAll('img')]
      ).filter(isVisuallyRelevant);

      return document.readyState === 'complete' &&
        (!document.fonts || document.fonts.status === 'loaded') &&
        elements.length > 0 &&
        images.every(image => image.complete && image.naturalWidth > 0);
    }, { timeout: readyTimeout }, selector);

    const element = await context.waitForSelector(selector, {
      visible: true,
      timeout: readyTimeout
    });
    try {
      await waitForLoadedState();
      await context.evaluate(async selector => {
        const isVisuallyRelevant = image => {
          for (let element = image; element; element = element.parentElement) {
            const style = getComputedStyle(element);
            if (style.display === 'none' || style.visibility === 'hidden') {
              return false;
            }
          }
          return true;
        };
        const images = [];
        document.querySelectorAll(selector).forEach(element => {
          if (element.matches('img')) {
            images.push(element);
          } else {
            images.push(...element.querySelectorAll('img'));
          }
        });
        // `complete` can be true before the browser has decoded the final pixels.
        await Promise.all([...new Set(images)].filter(isVisuallyRelevant).map(image => image.decode()));
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      }, selector);
      await waitForLoadedState();
      const stableElement = await context.waitForSelector(selector, {
        visible: true,
        timeout: readyTimeout
      });
      await stableElement.dispose();
    } finally {
      await element.dispose();
    }
  };

  const wait = async value => {
    if (typeof value === 'string') {
      await waitForVisualState(page, value);
    } else {
      await new Promise(resolve => setTimeout(resolve, value));
    }
  };

  if (scenario.readySelectorInFrame) {
    if (!scenario.readySelector) {
      throw new Error('readySelectorInFrame requires readySelector');
    }

    const element = await page.waitForSelector(scenario.readySelector, {
      visible: true,
      timeout: readyTimeout
    });
    try {
      if (await element.evaluate(node => node.tagName !== 'IFRAME')) {
        throw new Error('readySelectorInFrame requires readySelector to target an iframe');
      }

      const frame = await element.contentFrame();
      if (!frame) {
        throw new Error(`Unable to access iframe: ${scenario.readySelector}`);
      }
      await waitForVisualState(frame, scenario.readySelectorInFrame);
    } finally {
      await element.dispose();
    }
  }

  if (keyPressSelector) {
    for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
      await page.waitForSelector(keyPressSelectorItem.selector);

      if (keyPressSelectorItem?.clickSelector) {
        await page.click(keyPressSelectorItem.clickSelector);
      } else {
        await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
      }
    }
  }

  if (hoverSelector) {
    for (const hoverSelectorIndex of [].concat(hoverSelector)) {
      await page.waitForSelector(hoverSelectorIndex);
      await page.hover(hoverSelectorIndex);
    }
  }

  if (vp.label === 'mobile' && clickSelectorMobile) {
    clickSelector = clickSelectorMobile;
  }

  if (clickSelector) {
    for (const clickSelectorIndex of [].concat(clickSelector)) {
      await page.waitForSelector(clickSelectorIndex);
      await page.click(clickSelectorIndex);
      if (betweenSelectorInteractionWait) {
        await wait(betweenSelectorInteractionWait);
      }
    }
  }

  if (postInteractionWait) {
    await wait(postInteractionWait);
  }

  if (scrollToSelector) {
    await page.waitForSelector(scrollToSelector);
    await page.evaluate(scrollToSelector => {
      document.querySelector(scrollToSelector).scrollIntoView();
    }, scrollToSelector);
  }

  if (scenario.removeSelectors?.length) {
    // Backstop handles existing nodes earlier; this stylesheet also covers late-mounted matches.
    const style = await page.addStyleTag({
      content: scenario.removeSelectors.map(selector => `${selector} { display: none !important; }`).join('\n')
    });
    await style.dispose();
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  }
};
