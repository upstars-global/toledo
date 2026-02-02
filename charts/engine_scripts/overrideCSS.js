const BACKSTOP_TEST_CSS_OVERRIDE = `
* {
    -webkit-transition: none !important;
    -moz-transition: none !important;
    -o-transition: none !important;
    transition: none !important;
    animation-duration: 0s !important;
     transition-duration: 0s !important;
}
body {
  height: 100vh !important;
}
`

module.exports = async (page, scenario) => {
    console.log(`BACKSTOP_TEST_CSS_OVERRIDE injected for: ${ scenario.label }`)

    // run before any script on the real page — ensures injection into the real document
    await page.evaluateOnNewDocument((cssContent) => {
        const doInject = () => {
            try {
                if (document.getElementById('backstop-test-overrides')) return
                const s = document.createElement('style')
                s.id = 'backstop-test-overrides'
                s.textContent = cssContent;
                (document.head || document.documentElement).appendChild(s)
            } catch (e) {
                // noop
            }
        }
        document.addEventListener('DOMContentLoaded', doInject, { once: true })
    }, BACKSTOP_TEST_CSS_OVERRIDE)

}
