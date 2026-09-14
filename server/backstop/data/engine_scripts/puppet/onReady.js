module.exports = async (page, scenario, vp, isReference, browser, config) => {
  console.log('SCENARIO > ' + scenario.label)
  await require('./overrideCSS')(page, scenario)
  // await require('./paymentsLibSS')(page) commit for king

  await require('./clickAndHoverHelper')(page, scenario, vp, config)
  await require('./stabilizeScreenshot')(page, scenario)

  // add more ready handlers here...
}
