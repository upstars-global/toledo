module.exports = async (page) => {
    await page.evaluate(async () => {
        const imagesCollection = Array.from(document.images || []);
        console.log("WAIT_IMG_LOAD", { imagesCollection })
        await Promise.all(
            imagesCollection.map(img => {
                if (img.complete && img.naturalWidth > 0) return Promise.resolve();
                return new Promise(resolve => {
                    const done = () => resolve();
                    img.addEventListener('load', done, { once: true });
                    img.addEventListener('error', done, { once: true });
                });
            })
        );
    });
}
