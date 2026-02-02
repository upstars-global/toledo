module.exports = async (page) => {

//disable native lazy
    await page.evaluate(() => {
        const nodes = [
            ...document.querySelectorAll('img[loading="lazy"], iframe[loading="lazy"]')
        ];
        for (const el of nodes) el.setAttribute('loading', 'eager');

        for (const img of document.querySelectorAll('img[data-src], img[data-srcset]')) {
            if (img.dataset.src && !img.src) img.src = img.dataset.src;
            if (img.dataset.srcset && !img.srcset) img.srcset = img.dataset.srcset;
        }
    });
}
