export default function getScenarios(host: string) {
  return [
    {
      label: 'Homepage',
      url: `${host}/`,
      delay: 3000,
    },
    {
      label: 'Login',
      url: `${host}/login`,
      delay: 3000,
    },
    {
      label: 'Registration',
      url: `${host}/registration`,
      delay: 3000,
    },
    {
      label: 'Remind',
      url: `${host}/remind`,
      delay: 3000,
    },
    {
      label: "Category 'Top'",
      url: `${host}/slots/top`,
    },
    {
      label: "Producer 'Playn & go'",
      url: `${host}/producers/playngo`,
      delay: 3000,
    },
  ]
}
