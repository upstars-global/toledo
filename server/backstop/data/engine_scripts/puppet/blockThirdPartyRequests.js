const BLOCKED_URLS = [
    '*://*.freshdesk.com/*',
    '*://*.freshworks.com/*',
    '*://*.freshworksapi.com/*',
    '*://*.googletagmanager.com/*',
    '*://*.google-analytics.com/*',
    '*://*.doubleclick.net/*',
    '*://*.fullstory.com/*',
    '*://*.hotjar.com/*',
    '*://unpkg.com/web-vitals*'
]

module.exports = async page => {
    await page.evaluateOnNewDocument(() => {
        const noop = () => {}
        window.fdWidget = {
            close: noop,
            destroy: noop,
            init: noop,
            open: noop,
            reInit: noop,
            on: noop,
            user: {
                clear: async () => {},
                isExists: async () => ({ data: false, success: true })
            }
        }
    })

    const client = await page.target().createCDPSession()
    await client.send('Network.enable')
    await client.send('Network.setBlockedURLs', { urls: BLOCKED_URLS })
}
