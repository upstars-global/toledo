import { $themeBreakpoints } from '@themeConfig'

export default {
  namespaced: true,
  state: {
    windowWidth: 0,
    shallShowOverlay: false,
    testScenarios: [],
  },
  getters: {
    currentBreakPoint: state => {
      const { windowWidth } = state
      if (windowWidth >= $themeBreakpoints.xl) return 'xl'
      if (windowWidth >= $themeBreakpoints.lg) return 'lg'
      if (windowWidth >= $themeBreakpoints.md) return 'md'
      if (windowWidth >= $themeBreakpoints.sm) return 'sm'
      return 'xs'
    },
    apiAddr: () => '/',
    // apiAddr: () => 'http://localhost:3000/', // todo: вернуть / как и было
    getTestScenarios: state => state.testScenarios,
  },
  mutations: {
    UPDATE_WINDOW_WIDTH(state, val) {
      state.windowWidth = val
    },
    TOGGLE_OVERLAY(state, val) {
      state.shallShowOverlay = val !== undefined ? val : !state.shallShowOverlay
    },
    SET_TEST_SCENARIOS(state, val) {
      state.testScenarios = val
    },
  },
  actions: {
    async getAllScenarios({
      commit,
      getters,
    }, project) {
      const response = await fetch(`${getters.apiAddr}api/test-scenarios?project=${project}`)
      if (response.ok) {
        const testScenarios = await response.json()
        commit('SET_TEST_SCENARIOS', testScenarios)
      }
    },
  },
}
