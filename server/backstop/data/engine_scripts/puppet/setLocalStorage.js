module.exports = async (page, scenario) => {
    if (/users\/bonuses\/insurance/.test(scenario.url)) {
        try {
            const storageData = { depositInsuranceBonus: true };
            await page.evaluateOnNewDocument(() => {
                window.localStorage.setItem('FEATURE_FLAG_CONFIGURATION_KEY', JSON.stringify(storageData));
            });
        } catch (error) {
            console.error(error);
        }
    }
}
