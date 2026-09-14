const FONT_TIMEOUT = 12000
const HEIGHT_POLL_INTERVAL = 100
const HEIGHT_STABLE_FOR = 300
const HEIGHT_TIMEOUT = 3000

module.exports = async (page, scenario) => {
    const stabilize = () => page.evaluate(async options => {
        if (options.removeSelectors.length) {
            options.removeSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    element.style.cssText = 'display: none !important;'
                    element.classList.add('__86d')
                })
            })
        }

        let fontTimedOut = false
        const fontStartedAt = performance.now()
        if (document.fonts && document.fonts.status !== 'loaded') {
            let fontTimeoutId
            const fontTimeout = new Promise(resolve => {
                fontTimeoutId = setTimeout(() => {
                    fontTimedOut = true
                    resolve()
                }, options.fontTimeout)
            })
            await Promise.race([
                document.fonts.ready,
                fontTimeout
            ])
            clearTimeout(fontTimeoutId)
        }
        const fontWaitMs = Math.round(performance.now() - fontStartedAt)

        const readHeight = () => Math.max(
            document.body ? document.body.scrollHeight : 0,
            document.documentElement ? document.documentElement.scrollHeight : 0
        )
        const heightStartedAt = performance.now()
        let height = readHeight()
        let stableSince = heightStartedAt
        let heightChanges = 0

        while (performance.now() - heightStartedAt < options.heightTimeout) {
            await new Promise(resolve => setTimeout(resolve, options.heightPollInterval))
            const now = performance.now()
            const nextHeight = readHeight()
            if (nextHeight !== height) {
                height = nextHeight
                heightChanges += 1
                stableSince = now
            }
            if (now - stableSince >= options.heightStableFor) {
                break
            }
        }

        return {
            fontStatus: document.fonts ? document.fonts.status : 'unsupported',
            fontTimedOut,
            fontWaitMs,
            height,
            heightChanges,
            heightStable: performance.now() - stableSince >= options.heightStableFor,
            heightWaitMs: Math.round(performance.now() - heightStartedAt)
        }
    }, {
        fontTimeout: FONT_TIMEOUT,
        heightPollInterval: HEIGHT_POLL_INTERVAL,
        heightStableFor: HEIGHT_STABLE_FOR,
        heightTimeout: HEIGHT_TIMEOUT,
        removeSelectors: scenario.removeSelectors || []
    })
    const result = await stabilize()

    console.log(`SCREENSHOT_STABILITY ${scenario.label}: ${JSON.stringify(result)}`)
}
