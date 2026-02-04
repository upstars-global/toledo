module.exports = async (page, scenario, vp) => {
    console.log("/toledo/charts/engine_scripts/onBefore.js")
    await require('./settingScenarioCookies')(page, scenario)
    await require('./injectLocalStorage')(page, scenario)
    await require('./injectCSS')(page, scenario)

    // wait for stabilization fonts
    await page.evaluate(async () => {
        if (document.fonts?.ready) await document.fonts.ready
    })

    if (vp.label === 'mobile') {
        if (/rocketplay|alpa/.test(scenario.url)) {
            page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1')
            return
        }

        page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')
    }
}
