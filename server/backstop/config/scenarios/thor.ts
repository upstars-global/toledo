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
      label: 'Promotions',
      url: `${host}/promo`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Tournaments',
      url: `${host}/tournaments`,
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
      label: 'Casino Provider netent',
      url: `${host}/casino/providers/netent`,
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
      label: 'Casino Theme fruits',
      url: `${host}/casino/theme/fruits`,
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
      url: `${host}/live/providers/pragmaticplaylive`,
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
      url: `${host}/live/categories/toplive`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Search popup',
      url: `${host}/casino`,
      postInteractionWait: 3000,
      keyPressSelectors: [
        {
          selector: '.games-list-toolbar-search',
          clickSelector: '.games-list-toolbar-search',
        },
        {
          selector: '.game-search__input',
          keyPress: "book"
        },
      ],
      delay: 3000,
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
      label: 'Return Policy',
      url: `${host}/refund`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Responsible Gaming',
      url: `${host}/responsible-gaming`,
      delay: 3000,
      readySelector: '.promo-banner'
    },
    {
      label: 'Sports Betting Rules',
      url: `${host}/sports-betting-rules`,
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
      label: 'Profile Promocode',
      url: `${host}/users/promocode`,
      cookiePath,
      readySelector: ".profile-promocode__body [data-test='profile__input--promocode']",
    },
    {
      label: 'Profile Bonuses casino',
      url: `${host}/users/bonuses`,
      cookiePath,
      readySelector: ".profile-bonuses .bonus-item",
      postInteractionWait: 3000,
    },
    {
      label: 'Profile Bonuses casino history',
      url: `${host}/users/bonuses`,
      cookiePath,
      readySelector: ".profile-bonuses [data-test='profile-bonuses-history']",
      clickSelector: "[data-test='profile-bonuses-history']",
      scrollToSelector: "[data-test='profile-bonuses-history'] .bonus-item",
      postInteractionWait: 3000,
    },
    {
      label: 'Profile Bonuses sport',
      url: `${host}/users/bonuses`,
      cookiePath,
      clickSelector: "[data-test='sport-chip']",
      readySelector: ".profile-bonuses .bonus-item",
      postInteractionWait: 3000,
    },
    {
      label: 'Profile Bonuses sport history',
      url: `${host}/users/bonuses`,
      cookiePath,
      readySelector: ".profile-bonuses",
      clickSelector: [
        "[data-test='sport-chip']",
        "[data-test='profile-bonuses-history']",
      ],
      scrollToSelector: "[data-test='profile-bonuses-history'] .bonus-item",
      postInteractionWait: 3000,
    },
    {
      label: 'Profile Verification',
      url: `${host}/users/verification`,
      cookiePath,
      readySelector: ".verification .verification-state-card",
    },
    {
      label: 'Profile Level',
      url: `${host}/users/level`,
      cookiePath,
      readySelector: ".profile .level-system-carousel__element",
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
      clickSelectors: ['.header__user-balance', '[data-test=\'cashbox-button--header\']'],
      postInteractionWait: 1000,
    },
    {
      label: 'CashboxStepWithdraw',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      clickSelectors: ['.header__user-balance', '[data-test=\'cashbox-button--header\']', '.cashbox-dashboard__buttons .fe-button'],
      postInteractionWait: 1000,
    },
    {
      label: 'CashboxStepWithdrawAmount',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      clickSelectors: ['.header__user-balance', '[data-test=\'cashbox-button--header\']', '.cashbox-dashboard__buttons .fe-button', '.payments-item'],
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
      label: 'Support List',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      clickSelectors: ['.header [data-test=\'chat-button\']'],
      clickSelectorsMobile: ['[data-test=\'bottom-menu-more\']', '.sidebar [data-test=\'chat-button\']'],
      scrollToSelector: ".sidebar .vip-manager",
      postInteractionWait: 3000,
    },
    {
      label: 'Callback',
      url: `${host}`,
      cookiePath,
      delay: 3000,
      clickSelectors: ['.header [data-test=\'chat-button\']', '.header [data-test=\'chat-list--callback\']'],
      clickSelectorsMobile: ['[data-test=\'bottom-menu-more\']', '.sidebar [data-test=\'chat-button\']',  '.sidebar [data-test=\'chat-list--callback\']'],
      postInteractionWait: 3000,
    },
    {
      label: 'Notifications List',
      url: `${host}`,
      cookiePath,
      delay: 1000,
      clickSelectors: ['[data-test=\'notifications-button\']'],
      clickSelectorsMobile: ['[data-test=\'bottom-menu-more\']'],
      readySelector: ".fe-notice",
      postInteractionWait: 2000,
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
