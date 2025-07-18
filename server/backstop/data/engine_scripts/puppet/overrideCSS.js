const BACKSTOP_TEST_CSS_OVERRIDE = '* {-webkit-transition: none !important;-moz-transition: none !important;-o-transition: none !important;transition: none !important;animation-duration: 0s !important; transition-duration: 0s !important;} body {height: 100vh !important;}'

module.exports = async (page, scenario) => {
  // inject arbitrary css to override styles
  await page.evaluate(`window._styleData = '${BACKSTOP_TEST_CSS_OVERRIDE}'`)
  await page.evaluate(() => {
    const style = document.createElement('style')
    style.type = 'text/css'
    const styleNode = document.createTextNode(window._styleData)
    style.appendChild(styleNode)
    document.head.appendChild(style)
  })

  console.log(`BACKSTOP_TEST_CSS_OVERRIDE injected for: ${scenario.label}`)
}
