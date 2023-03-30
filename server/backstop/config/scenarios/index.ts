import alpa from './alpa'
import thor from './thor'

const configs = {
  alpa,
  thor,
}

export default function getScenarios(project: "alpa" | "thor", host: string) {
  let baseUrl = host
  if (!baseUrl.startsWith('http')) {
    baseUrl = `http://${baseUrl}`
  }
  return configs[project](baseUrl)
}
