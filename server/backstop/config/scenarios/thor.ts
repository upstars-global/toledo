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
      label: 'Vip club Guest',
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
      label: 'Casino Categories Top',
      url: `${host}/casino/categories/top`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: "Casino Providers",
      url: `${host}/casino/providers`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Casino Provider endorphina',
      url: `${host}/casino/providers/endorphina`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Casino Theme',
      url: `${host}/casino/theme`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Live Providers',
      url: `${host}/live/providers`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Live Provider pragmatic play',
      url: `${host}/live/providers/pragmaticplay`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Live Categories',
      url: `${host}/live/categories`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Live Categories Lobby',
      url: `${host}/live/categories/lobby`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Benefits of Crypto',
      url: `${host}/benefits-of-crypto`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Privacy Policy ',
      url: `${host}/privacy-policy`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Payment Policy',
      url: `${host}/payment-policy`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Aml Policy',
      url: `${host}/aml-policy`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'KYC Procedure',
      url: `${host}/kyc`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Bonus terms and conditions',
      url: `${host}/bonus-terms-and-conditions`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'FAQ',
      url: `${host}/faq`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
      // Auth user
    {
      label: 'Homepage auth',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      readySelector: '.header__wrapper'
    },
    {
      label: 'Vip club Auth',
      url: `${host}/vip-club`,
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
