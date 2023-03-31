export default function getScenarios(host: string) {
  return [
    {
      label: 'Homepage',
      url: `${host}/`,
    },
    {
      label: 'Login',
      url: `${host}/login`,
    },
    {
      label: 'Registration',
      url: `${host}/registration`,
    },
    {
      label: 'Remind',
      url: `${host}/remind`,
    },
    {
      label: "Category 'Top'",
      url: `${host}/slots/top`,
    },
    {
      label: "Producer 'Playn & go'",
      url: `${host}/producers/playngo`,
    },
  ]
}
