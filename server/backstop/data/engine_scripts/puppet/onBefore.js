module.exports = async (page, scenario, vp) => {
  await require('./loadCookies')(page, scenario)

  if (vp.label === 'mobile') {
    page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4590.2 Safari/537.36 Chrome-Lighthouse')
  }
}
