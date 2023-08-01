import { processHost } from '../../../helpers/cookiesHelper'
import {MOCK_ADDR}from '@config'
export default function getScenarios(host: string) {
  const cookiePath = MOCK_ADDR ? 'backstop/config/cookies/cookies-thor.json' : processHost(host)

  return [
    {
      label: 'Homepage',
      url: `${host}/`,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Casino',
      url: `${host}/casino`,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Live',
      url: `${host}/live`,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Arena',
      url: `${host}/arena`,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Quests',
      url: `${host}/quests`,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Bonus',
      url: `${host}/bonus`,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Bonus sport',
      url: `${host}/bonus/sport`,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Vip',
      url: `${host}/vip`,
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
