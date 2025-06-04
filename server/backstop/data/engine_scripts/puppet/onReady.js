module.exports = async (page, scenario, vp) => {
  console.log('SCENARIO > ' + scenario.label)
  await require('./overrideCSS')(page, scenario)
  // await require('./paymentsLibSS')(page) commit for king

  await require('./clickAndHoverHelper')(page, scenario, vp)

  // add more ready handlers here...
}
