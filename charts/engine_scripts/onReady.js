function wait (duration) {
    return new Promise((resolve) => {
        return setTimeout(resolve, duration)
    })
}

module.exports = async (page, scenario, vp) => {
    console.log('SCENARIO > ' + scenario.label)
    await wait(50)
    await require('./clickAndHoverHelper')(page, scenario, vp)
    await require('./disableImgLazy')(page)
    await require('./waitImgLoad')(page)

}
