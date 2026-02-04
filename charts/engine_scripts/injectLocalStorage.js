module.exports = async (page, scenario) => {
        try {
            await page.evaluateOnNewDocument(() => {
                window.localStorage.setItem('injectLocalStorage', JSON.stringify(true));
            });
        } catch (error) {
            console.error(error);
        }
}
