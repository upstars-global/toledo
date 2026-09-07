module.exports = async (page, scenario, vp, ...backstopArgs) => {
  const [, , config] = backstopArgs;

  console.log('SCENARIO > ' + scenario.label);
  await require('./overrideCSS')(page, scenario);
  // await require('./paymentsLibSS')(page) commit for king

  await require('./clickAndHoverHelper')(page, scenario, vp, config);

  // add more ready handlers here...
};
