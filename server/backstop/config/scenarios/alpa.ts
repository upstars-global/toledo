export default function getScenarios(host: string) {
  return [
    {
      label: 'Homepage',
      url: `${host}/`,
      delay: 3000,
      readySelector: '.jackpot-item',
    },
    {
      label: 'Homepage auth',
      url: `${host}/`,
      cookiePath: 'backstop/data/engine_scripts/cookies.json',
      delay: 3000,
      readySelector: '.jackpot-item',
    },
    // {
    //     label: "Deposit",
    //     url: `${ host }/`,
    //     cookiePath: "backstop/data/engine_scripts/cookies.json",
    //     clickSelector: "[data-test=\"header__deposit-btn\"]",
    //     delay: 3000,
    // },
    {
      label: 'Quest',
      url: `${host}/action/quick-snatch`,
      delay: 3000,
    },
    {
      label: 'Tournament',
      url: `${host}/tournaments/1017`,
      delay: 3000,
    },
    {
      label: 'Lootbox auth',
      url: `${host}/rocket-wheel`,
      cookiePath: 'backstop/data/engine_scripts/cookies.json',
      delay: 3000,
    },
    {
      label: 'Profile',
      url: `${host}/users/`,
      cookiePath: 'backstop/data/engine_scripts/cookies.json',
      delay: 3000,
    },
    {
      label: 'Profile level',
      url: `${host}/users/level`,
      cookiePath: 'backstop/data/engine_scripts/cookies.json',
      delay: 3000,
    },
    {
      label: 'Profile gifts',
      url: `${host}/users/gifts`,
      cookiePath: 'backstop/data/engine_scripts/cookies.json',
      delay: 3000,
    },
    {
      label: 'Profile verification',
      url: `${host}/users/verification`,
      cookiePath: 'backstop/data/engine_scripts/cookies.json',
      delay: 3000,
    },
    {
      label: 'Profile limits',
      url: `${host}/users/limits`,
      cookiePath: 'backstop/data/engine_scripts/cookies.json',
      delay: 3000,
    },
    {
      label: 'Profile security',
      url: `${host}/users/security`,
      cookiePath: 'backstop/data/engine_scripts/cookies.json',
      delay: 3000,
    },
    {
      label: 'Profile games-history',
      url: `${host}/users/games-history`,
      cookiePath: 'backstop/data/engine_scripts/cookies.json',
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
      label: 'terms-and-conditions',
      url: `${host}/terms-and-conditions`,
      delay: 3000,
    },
    {
      label: 'vip',
      url: `${host}/vip`,
      delay: 3000,
    },
    {
      label: 'benefits-of-crypto',
      url: `${host}/benefits-of-crypto`,
      delay: 3000,
    },
    {
      label: 'faq',
      url: `${host}/faq`,
      delay: 3000,
    },
    {
      label: 'support',
      url: `${host}/support`,
      delay: 3000,
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
