module.exports = async (page, scenario, vp, config = {}) => {
  const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector;
  let clickSelector = scenario.clickSelectors || scenario.clickSelector;
  const clickSelectorMobile = scenario.clickSelectorsMobile || scenario.clickSelectorMobile;
  const keyPressSelector = scenario.keyPressSelectors || scenario.keyPressSelector;
  const scrollToSelector = scenario.scrollToSelector;
  const postInteractionWait = scenario.postInteractionWait;
  const betweenSelectorInteractionWait = scenario.betweenSelectorInteractionWait;
  const readyTimeout = scenario.readyTimeout || config.readyTimeout || 30000;
  let readyFrame;

  const waitForSelector = async (context, selector) => {
    const element = await context.waitForSelector(selector, {
      visible: true,
      timeout: readyTimeout
    });
    await element.dispose();
  };

  const wait = async value => {
    if (typeof value === 'string') {
      await waitForSelector(page, value);
    } else {
      await new Promise(resolve => setTimeout(resolve, value));
    }
  };

  const waitForImages = async selector => {
    const handle = await page.waitForFunction(imageSelector => {
      const images = [...document.querySelectorAll(imageSelector)];
      return images.length > 0 && images.every(image => image.complete && image.naturalWidth > 0);
    }, { timeout: readyTimeout }, selector);
    await handle.dispose();
  };

  if (scenario.readySelectorInFrame) {
    if (!scenario.readySelector) {
      throw new Error('readySelectorInFrame requires readySelector');
    }

    const frameElement = await page.waitForSelector(scenario.readySelector, {
      visible: true,
      timeout: readyTimeout
    });

    try {
      if (await frameElement.evaluate(element => element.tagName !== 'IFRAME')) {
        throw new Error('readySelectorInFrame requires readySelector to target an iframe');
      }

      readyFrame = await frameElement.contentFrame();
      if (!readyFrame) {
        throw new Error(`Unable to access iframe: ${scenario.readySelector}`);
      }

      await waitForSelector(readyFrame, scenario.readySelectorInFrame);
    } finally {
      await frameElement.dispose();
    }
  }

  if (keyPressSelector) {
    for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
      await waitForSelector(page, keyPressSelectorItem.selector);

      if (keyPressSelectorItem?.clickSelector) {
        await page.click(keyPressSelectorItem.clickSelector);
      } else {
        await page.type(keyPressSelectorItem.selector, keyPressSelectorItem.keyPress);
      }
    }
  }

  if (hoverSelector) {
    for (const hoverSelectorItem of [].concat(hoverSelector)) {
      await waitForSelector(page, hoverSelectorItem);
      await page.hover(hoverSelectorItem);
    }
  }

  if (vp.label === 'mobile' && clickSelectorMobile) {
    clickSelector = clickSelectorMobile;
  }

  if (clickSelector) {
    for (const clickSelectorItem of [].concat(clickSelector)) {
      await waitForSelector(page, clickSelectorItem);
      await page.click(clickSelectorItem);
      if (betweenSelectorInteractionWait) {
        await wait(betweenSelectorInteractionWait);
      }
    }
  }

  if (postInteractionWait) {
    await wait(postInteractionWait);
  }

  if (scrollToSelector) {
    await waitForSelector(page, scrollToSelector);
    await page.evaluate(selector => {
      document.querySelector(selector).scrollIntoView();
    }, scrollToSelector);
  }

  if (scenario.readyImageSelector) {
    for (const selector of [].concat(scenario.readyImageSelector)) {
      await waitForImages(selector);
    }
  }

  if (scenario.waitForFonts) {
    const fonts = await (readyFrame || page).waitForFunction(
      () => !document.fonts || document.fonts.status === 'loaded',
      { timeout: readyTimeout }
    );
    await fonts.dispose();
  }

};
