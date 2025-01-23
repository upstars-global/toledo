import { processHost } from '../../../helpers/cookiesHelper';
import mobileViewports from '../viewports/mobile';

export default function getScenarios(host: string) {
    const cookiePath = processHost(host);

    return [
        {
            label: 'Homepage',
            url: `${host}/`,
            delay: 3000,
            readySelector: '.trust-block',
        },
        {
            label: 'Homepage auth',
            url: `${host}/`,
            cookiePath,
            delay: 3000,
            readySelector: '.trust-block',
            // scrollToSelector: '.footer__copyright',
        },
        {
            label: 'Deposit',
            url: `${host}/`,
            cookiePath,
            clickSelector: '[data-test="header__deposit-btn"]',
            clickSelectorsMobile: '[data-test="bottom-menu__deposit-button"]',
            postInteractionWait: 5000,
            delay: 3000,
        },
        {
            label: 'Deposit Step Payments list',
            url: `${host}/`,
            cookiePath,
            clickSelector: [ '[data-test="header__deposit-btn"]', '[data-test="cashbox-deposit__next-btn"]' ],
            clickSelectorsMobile: [ '[data-test="bottom-menu__deposit-button"]', '[data-test="cashbox-deposit__next-btn"]' ],
            postInteractionWait: 5000,
            delay: 3000,
        },
        {
            label: 'Deposit Step render Card form',
            url: `${host}/`,
            cookiePath,
            clickSelector: [
                '[data-test="header__deposit-btn"]',
                '[data-test="cashbox-deposit__next-btn"]',
                '[data-test="cashbox-item-item-brand__devcode_devcode-creditcard-36_creditcard"]',
                '[data-test="cashbox-deposit__next-btn"]',
            ],
            clickSelectorsMobile: [
                '[data-test="bottom-menu__deposit-button"]',
                '[data-test="cashbox-deposit__next-btn"]',
                '[data-test="cashbox-item-item-brand__devcode_devcode-creditcard-36_creditcard"]',
                '[data-test="cashbox-deposit__next-btn"]',
            ],
            delay: 1000,
        },
        {
            label: 'Deposit Step render Card form saved method',
            url: `${host}/`,
            cookiePath,
            clickSelector: [
                '[data-test="header__deposit-btn"]',
                '[data-test="cashbox-deposit__next-btn"]',
                '[data-test="cashbox-item-item-brand__537541******4375"]',
                '[data-test="cashbox-deposit__next-btn"]',
            ],
            clickSelectorsMobile: [
                '[data-test="bottom-menu__deposit-button"]',
                '[data-test="cashbox-deposit__next-btn"]',
                '[data-test="cashbox-item-item-brand__537541******4375"]',
                '[data-test="cashbox-deposit__next-btn"]',
            ],
            delay: 1000,
        },
        {
            label: 'Deposit Step render Crypto method',
            url: `${host}/`,
            cookiePath,
            clickSelector: [
                '[data-test="header__deposit-btn"]',
                '[data-test="cashbox-deposit__next-btn"]',
                '[data-test="cashbox-item-item-brand__coinspaid_coinspaid-76_BTC_coinspaid"]',
                '[data-test="cashbox-deposit__next-btn"]',
            ],
            clickSelectorsMobile: [
                '[data-test="bottom-menu__deposit-button"]',
                '[data-test="cashbox-deposit__next-btn"]',
                '[data-test="cashbox-item-item-brand__coinspaid_coinspaid-76_BTC_coinspaid"]',
                '[data-test="cashbox-deposit__next-btn"]',
            ],
            delay: 1000,
        },
        {
            label: 'Cashbox Dashboard',
            url: `${ host }/cashbox`,
            cookiePath,
            removeSelectors: [ '.ps__thumb-y' ],
            readySelector: '.cashbox-dashboard__user-balance',
        },
        {
            label: 'Withdraw Step 1',
            url: `${ host }/withdraw`,
            cookiePath,
            readySelector: '.modal-cashbox-step-withdraw .user-balance',
        },
        {
            label: 'Balance dropdown',
            url: `${host}/`,
            cookiePath,
            clickSelector: '.header__user-balance-arrow',
            clickSelectorsMobile: [ '[data-test="cookies-accept__accept-btn"]', '.header__user-balance-arrow' ],
            postInteractionWait: 3000,
            delay: 3000,
            selectorExpansion: true,
            selectors: [ '.dropdown-balance' ],
        },
        {
            label: 'SideBar',
            url: `${host}/`,
            viewports: mobileViewports,
            clickSelector: [ '[data-test="cookies-accept__accept-btn"]', '[data-test="bottom-menu__open-sidebar"]' ],
            delay: 3000,
        },
        {
            label: 'SideBar auth user',
            url: `${host}/`,
            cookiePath,
            viewports: mobileViewports,
            clickSelector: [ '[data-test="cookies-accept__accept-btn"]', '[data-test="bottom-menu__open-sidebar"]' ],
            delay: 3000,
        },

        {
            label: 'Search popup',
            url: `${host}/`,
            clickSelector: '[data-test=\'open-search-button\']',
            postInteractionWait: 3000,
            delay: 3000,
            // scrollToSelector: '.footer__copyright',
        },
        {
            label: 'Producers popup Homepage',
            url: `${host}/`,
            delay: 3000,
            readySelector: '.producers-block',
            clickSelector: '.game-producers__activator',
            clickSelectorsMobile: [ '[data-test="cookies-accept__accept-btn"]', '.game-producers__activator' ],

        },
        {
            label: 'Producers popup pokies',
            url: `${host}/pokies/all`,
            delay: 3000,
            readySelector: '.games-list-toolbar__producers',
            clickSelector: '.game-producers__activator',
            clickSelectorsMobile: [ '[data-test="cookies-accept__accept-btn"]', '.game-producers__activator' ],

        },
        {
            label: 'Producers popup categories',
            url: `${host}/categories/all`,
            delay: 3000,
            readySelector: '.games-list-toolbar__producers',
            clickSelector: '.game-producers__activator',
            clickSelectorsMobile: [ '[data-test="cookies-accept__accept-btn"]', '.game-producers__activator' ],
        },

        {
            label: 'Quest',
            url: `${host}/action/starship`,
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
            label: 'Promotions',
            url: `${host}/promotions`,
            delay: 3000,
        },
        {
            label: 'Lootbox auth',
            url: `${host}/rocket-wheel`,
            cookiePath,
            postInteractionWait: 2000,
            delay: 3000,
            readySelector: '.loot-box-spin-wheel-container',
        },
        {
            label: 'Profile',
            url: `${host}/users/`,
            cookiePath,
            delay: 3000,
        },
        {
            label: 'Profile level',
            url: `${host}/users/level`,
            cookiePath,
            delay: 3000,
        },
        {
            label: 'Profile gifts',
            url: `${host}/users/gifts`,
            cookiePath,
            delay: 3000,
        },
        {
            label: 'Profile verification',
            url: `${host}/users/verification`,
            cookiePath,
            delay: 3000,
        },
        {
            label: 'Profile limits',
            url: `${host}/users/limits`,
            cookiePath,
            delay: 5000,
        },
        {
            label: 'Profile security',
            url: `${host}/users/security`,
            cookiePath,
            delay: 5000,
        },
        {
            label: 'Profile games-history',
            url: `${host}/users/games-history`,
            cookiePath,
            delay: 5000,
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
            label: 'New-password',
            url: `${host}/new-password`,
            delay: 3000,
        },
        {
            label: 'Oops',
            url: `${host}/oops`,
            delay: 3000,
        },
        {
            label: 'terms-and-conditions',
            url: `${host}/terms-and-conditions`,
            delay: 3000,
            readySelector: '.static-page',
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
            delay: 5000,
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
        {
            label: 'Vip Adventure',
            url: `${host}/rocket-adventure`,
            delay: 3000,
        },
        {
            label: 'Cookie policy',
            url: `${host}/cookie-policy`,
            delay: 3000,
        },
        {
            label: 'Game page',
            url: `${host}/play/bgaming/lucky-ladys-clover`,
            cookiePath,
            viewports: mobileViewports,
            clickSelector: ['[data-test="cookies-accept__accept-btn"]', '.game-bookmark'],
            delay: 3000,
        },

    ]
}
