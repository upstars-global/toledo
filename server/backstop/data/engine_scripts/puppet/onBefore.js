module.exports = async (page, scenario, vp) => {
  await require('./loadCookies')(page, scenario);

  if (vp.label === 'mobile') {
    page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')
  }
};
