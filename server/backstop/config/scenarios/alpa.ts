export default function getScenarios(host: string) {
  let cookiePath = 'backstop/config/cookies/'
  if (host === 'http://frontera-alpa-develop-mock.alpa.svc.cluster.local:2004') {
    cookiePath += 'cookies-alpa-develop.json'
  } else if (host === 'http://frontera-alpa-staging-mock.alpa.svc.cluster.local:2004') {
    cookiePath += 'cookies-alpa-staging.json'
  } else {
    cookiePath += 'cookies-alpa-local.json'
  }

  return [
    {
      label: 'Homepage',
      url: `${host}/`,
      delay: 3000,
      readySelector: '.jackpot-item',
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Homepage auth',
      url: `${host}/`,
      cookiePath,
      delay: 3000,
      readySelector: '.jackpot-item',
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Deposit',
      url: `${host}/`,
      cookiePath,
      clickSelector: '[data-test="header__deposit-btn"]',
      postInteractionWait: 5000,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Balance dropdown',
      url: `${host}/`,
      cookiePath,
      clickSelector: '.header__user-balance-arrow',
      postInteractionWait: 3000,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Search popup',
      url: `${host}/`,
      clickSelector: "[data-test='open-search-button']",
      postInteractionWait: 3000,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Quest',
      url: `${host}/action/quick-snatch`,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Tournament',
      url: `${host}/tournaments/1017`,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Tournament all',
      url: `${host}/tournaments/all`,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Lootbox auth',
      url: `${host}/rocket-wheel`,
      cookiePath,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Profile',
      url: `${host}/users/`,
      cookiePath,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Profile level',
      url: `${host}/users/level`,
      cookiePath,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Profile gifts',
      url: `${host}/users/gifts`,
      cookiePath,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Profile verification',
      url: `${host}/users/verification`,
      cookiePath,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Profile limits',
      url: `${host}/users/limits`,
      cookiePath,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Profile security',
      url: `${host}/users/security`,
      cookiePath,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'Profile games-history',
      url: `${host}/users/games-history`,
      cookiePath,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
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
      label: 'terms-and-conditions',
      url: `${host}/terms-and-conditions`,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'vip',
      url: `${host}/vip`,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'mystic-jackpots',
      url: `${host}/mystic-jackpots`,
      delay: 3000,
    },
    {
      label: 'gift-for-review',
      url: `${host}/gift-for-review`,
      delay: 3000,
    },
    {
      label: 'share-your-experience',
      url: `${host}/share-your-experience`,
      delay: 3000,
    },
    {
      label: 'rocketplay-vipclub',
      url: `${host}/rocketplay-vipclub`,
      delay: 3000,
    },
    {
      label: 'benefits-of-crypto',
      url: `${host}/benefits-of-crypto`,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'faq',
      url: `${host}/faq`,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'support',
      url: `${host}/support`,
      delay: 3000,
      // scrollToSelector: '.footer__copyright',
    },
    {
      label: 'sport/registration',
      url: `${host}/sport/registration`,
      delay: 3000,
    },
    {
      label: 'sport/login',
      url: `${host}/sport/login`,
      delay: 3000,
    },
  ]
}
