import { processHost } from '../../../helpers/cookiesHelper'
import {MOCK_ADDR}from '@config'
export default function getScenarios(host: string) {
  const cookiePath = MOCK_ADDR ? 'backstop/config/cookies/cookies-thor.json' : processHost(host)

  return [
    {
      label: 'Homepage',
      url: `${host}/`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Casino',
      url: `${host}/casino`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Live',
      url: `${host}/live`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Arena',
      url: `${host}/arena`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Vip club',
      url: `${host}/vip-club`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Quests',
      url: `${host}/quests`,
      delay: 3000,
      cookiePath,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Bonus',
      url: `${host}/bonus`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Bonus sport',
      url: `${host}/bonus/sport`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Vip',
      url: `${host}/vip`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Terms',
      url: `${host}/terms-and-conditions`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Promotion fs-review',
      url: `${host}/fs-review`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Tournament page',
      url: `${host}/tournaments/1690879800Newbies-Cup`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Promo page',
      url: `${host}/promo/marvel-stars`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: "Producer 'Playn & go'",
      url: `${host}/producers/playngo`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
      //
    {
      label: 'Homepage auth',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Profile auth',
      url: `${host}/users/cabinet`,
      cookiePath,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Personal data auth',
      url: `${host}/users/cabinet`,
      cookiePath,
      clickSelector: "[data-test='user-data-personal']",
      postInteractionWait: 3000,
    },
    {
      label: 'Personal address auth',
      url: `${host}/users/cabinet`,
      cookiePath,
      clickSelector: "[data-test='user-data-address']",
      postInteractionWait: 3000,
    },
    {
      label: 'PersonalLimits DepositLimits',
      url: `${host}/users/limits`,
      cookiePath,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'PersonalLimits AddDepositLimit',
      url: `${host}/users/limits`,
      cookiePath,
      delay: 3000,
      clickSelector: "[data-test='add-deposit-limit-button']",
      postInteractionWait: 3000,
    },
    {
      label: 'PersonalLimits ManageDepositLimit',
      url: `${host}/users/limits`,
      cookiePath,
      delay: 3000,
      clickSelector: "[data-test='manage-limit-daily-button']",
      postInteractionWait: 3000,
    },
    {
      label: 'CashboxDashboard',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      clickSelectors: ['.header__user-balance', '.user-balance__common .fe-button'],
      postInteractionWait: 1000,
    },
    {
      label: 'CashboxStepWithdraw',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      clickSelectors: ['.header__user-balance', '.user-balance__common .fe-button', '.cashbox-dashboard__buttons .fe-button'],
      postInteractionWait: 1000,
    },
    {
      label: 'CashboxStepWithdrawAmount',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      clickSelectors: ['.header__user-balance', '.user-balance__common .fe-button', '.cashbox-dashboard__buttons .fe-button', '.payments-item'],
      postInteractionWait: 1000,
    },
    {
      label: 'Cashbox deposit1',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      clickSelectors: ['.header__cashbox'],
      clickSelectorsMobile: ['.bottom-menu-nav-btn-cashbox'],
      postInteractionWait: 3000,
    },
    {
      label: 'Cashbox deposit2',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      clickSelectors: ['.header__cashbox', '.payments-item'],
      clickSelectorsMobile: ['.bottom-menu-nav-btn-cashbox', '.payments-item'],
      postInteractionWait: 3000,
    },
    {
      label: 'Cashbox deposit3',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      clickSelectors: ['.header__cashbox', '.payments-item', '.deposit-button'],
      clickSelectorsMobile: ['.bottom-menu-nav-btn-cashbox', '.payments-item', '.deposit-button'],
      postInteractionWait: 3000,
    },
    {
      label: 'Balance dropdown',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      clickSelector: '.header__user-balance',
      postInteractionWait: 1000,
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
  ]
}
