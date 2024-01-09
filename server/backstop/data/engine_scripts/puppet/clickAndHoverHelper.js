module.exports = async (page, scenario, vp) => {
  const hoverSelector = scenario.hoverSelectors || scenario.hoverSelector;
  let clickSelector = scenario.clickSelectors || scenario.clickSelector;
  const clickSelectorMobile = scenario.clickSelectorsMobile || scenario.clickSelectorMobile;
  const keyPressSelector = scenario.keyPressSelectors || scenario.keyPressSelector;
  const scrollToSelector = scenario.scrollToSelector;
  const postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]

  if (keyPressSelector) {
    for (const keyPressSelectorItem of [].concat(keyPressSelector)) {
      await page.waitForSelector(keyPressSelectorItem.selector);
      
      if(keyPressSelectorItem?.clickSelector) {
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

  if (vp.label === "mobile" && clickSelectorMobile) {
    clickSelector = clickSelectorMobile;
  }

  if (clickSelector) {
    for (const clickSelectorIndex of [].concat(clickSelector)) {
      await page.waitForSelector(clickSelectorIndex);
      await page.click(clickSelectorIndex);
    }
  }

  if (postInteractionWait) {
    await page.waitForTimeout(postInteractionWait);
  }

  if (scrollToSelector) {
    await page.waitForSelector(scrollToSelector);
    await page.evaluate(scrollToSelector => {
      document.querySelector(scrollToSelector).scrollIntoView();
    }, scrollToSelector);
  }
};
