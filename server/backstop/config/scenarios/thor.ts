import { processHost } from '../../../helpers/cookiesHelper';
export default function getScenarios(host: string) {
  const cookiePath = processHost(host);

  return [
    {
      label: 'Homepage',
      url: `${host}/`,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
      //
    {
      label: 'Homepage auth',
      url: `${host}/`,
      cookiePath,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Login',
      url: `${host}/login`,
      delay: 3000,
      readySelector: '.popup'
    },
    {
      label: 'Registration',
      url: `${host}/registration`,
      delay: 3000,
      readySelector: '.popup'
    },
    {
      label: 'Remind',
      url: `${host}/remind`,
      delay: 3000,
      readySelector: '.popup'
    },
    {
      label: "404",
      url: `${host}/sdfsdfsfsdf`,
    },
    {
      label: "Producer 'Playn & go'",
      url: `${host}/producers/playngo`,
      delay: 3000,
    },
  ]
}
