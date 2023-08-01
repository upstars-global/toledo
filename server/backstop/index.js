import getPages from './config/scenarios'

const backstop = require('backstopjs')
const fs = require('fs')

const defaultScenarios = JSON.parse(fs.readFileSync('./backstop/config/defaultScenarios.json'))

function getPaths(command, project, folder) {
  return {
    bitmaps_reference: command === 'reference'
        ? `backstop/reference/${project}`
        : `backstop/test/${project}/${folder}/reference`,
    bitmaps_test: `backstop/test/${project}`,
    html_report: `backstop/data/html_report/${project}`,
    ci_report: `backstop/data/ci_report/${project}`,
    engine_scripts: 'backstop/data/engine_scripts',
  }
}

function getScenarios(project, hostName) {
  const pagesConfig = getPages(project, hostName)
  const scenarios = []

  pagesConfig.forEach(config => {
    scenarios.push({
      ...defaultScenarios,
      ...config,
    })
  })

  return scenarios
}

import {NODE_ENV}from '@config'
export default function commandFn(command, { hostName, project, testId }) {
  const file = JSON.parse(
      fs.readFileSync(`./backstop/config/${NODE_ENV ? 'defaultConfigDev' : 'defaultConfig'}.json`)
  )

  file.paths = getPaths(command, project, testId)
  file.scenarios = getScenarios(project, hostName)

  if (testId) {
    file.dynamicTestId = testId
  }

  return backstop(command, {
    config: file,
  })
}
