module.exports = async (page, scenario, vp) => {

  const methodsCollections = await require('./paymentLibDepMethods')
  const fieldMethods = await require('./paymentLibMethodsFields')

  await page.evaluate(async (methodsCollections, fieldMethods) => {
    Object.defineProperties(window, {
      PaymentsAPI: {
        configurable: false,
        writable: false,
        enumerable: true,
        value: {
          config() {},
          getMethods() {
            return methodsCollections
          },
          getMethodFields({
            id,
            savedProfileId
          }) {
            if (savedProfileId) {
              return fieldMethods.savedCardForm
            }
            if (id.includes('coinspaid')) {
              return fieldMethods.coinspaid
            }
            return fieldMethods.cardForm
          }
        }
      }
    })

  }, methodsCollections, fieldMethods)

}

