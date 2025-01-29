const cookies = [
    {
        "name": "default_token",
        "value": "testpass@bbq.agency",
    }
]

export default function getScenarios() {
    return [
        {
            label: 'Homepage',
            url: `/`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Casino',
            url: `/casino`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Live',
            url: `/live`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Promotions Casino Current',
            url: `/promotions/casino`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Promotions Casino Actions',
            url: `/promotions/casino/actions`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Promotions Casino Tournaments',
            url: `/promotions/casino/tournaments`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Promotions Casino Quests for guest',
            url: `/promotions/casino/quests`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Vip club Guest',
            url: `/vip-club`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Promotions Casino Quests for user',
            url: `/promotions/casino/quests`,
            delay: 3000,
            cookies,
            readySelector: '.header__wrapper',
        },
        {
            label: 'Bonus',
            url: `/bonus`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Bonus sport',
            url: `/bonus/sport`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Loyalty Program Page',
            url: `/vip`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Tournament page',
            url: `/tournaments/1690879800Newbies-Cup`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Promo page',
            url: `/actions/marvel-stars`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Casino Categories Top',
            url: `/casino/categories/top`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Casino Providers',
            url: `/casino/providers`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Casino Provider netent',
            url: `/casino/providers/netent`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Casino Theme',
            url: `/casino/theme`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Casino Theme fruits',
            url: `/casino/theme/fruits`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Live Providers',
            url: `/live/providers`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Live Provider pragmatic play',
            url: `/live/providers/pragmaticplaylive`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Live Categories',
            url: `/live/categories`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Live Categories Top Live',
            url: `/live/categories/toplive`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Search popup',
            url: `/casino`,
            postInteractionWait: 3000,
            keyPressSelectors: [
                {
                    selector: '.games-list-toolbar-search',
                    clickSelector: '.games-list-toolbar-search',
                },
                {
                    selector: '.search-input__input',
                    keyPress: 'book',
                },
            ],
            delay: 3000,
        },
        {
            label: 'Benefits of Crypto',
            url: `/benefits-of-crypto`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Aml Policy',
            url: `/aml-policy`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Return Policy',
            url: `/refund`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Responsible Gaming',
            url: `/responsible-gaming`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Sports Betting Rules',
            url: `/sports-betting-rules`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'Static Page',
            url: `/kyc`,
            delay: 3000,
            readySelector: '.promo-banner',
        },
        {
            label: 'PWA instruction ios safari popup',
            url: `#pwa-instruction-ios-safari`,
            delay: 3000,
            readySelector: '[data-test="pwa-instruction-ios-safari"]',
        },
        {
            label: 'PWA instruction macos safari popup',
            url: `#pwa-instruction-macos-safari`,
            delay: 3000,
            readySelector: '[data-test="pwa-instruction-macos-safari"]',
        },
        {
            label: 'PWA instruction install app popup',
            url: `#pwa-instruction-install-app`,
            delay: 3000,
            readySelector: '[data-test="pwa-instruction-install-app"]',
        },
        {
            label: 'PWA instruction copy link popup',
            url: `#pwa-instruction-copy-link`,
            delay: 3000,
            readySelector: '[data-test="pwa-instruction-copy-link"]',
        },
        // Auth user
        {
            label: 'Homepage auth',
            url: ``,
            cookies,
            delay: 3000,
            readySelector: '.header__wrapper',
        },
        {
            label: 'Vip club Auth',
            url: `/vip-club`,
            cookies,
            delay: 3000,
            readySelector: '.header__wrapper',
        },
        {
            label: 'Profile auth',
            url: `/users/cabinet`,
            cookies,
            delay: 3000,
            readySelector: '.header__wrapper',
        },
        {
            label: 'Personal data auth',
            url: `/users/cabinet`,
            cookies,
            delay: 3000,
            readySelector: '.header__wrapper',
            clickSelector: '[data-test=\'personal-information-accordion-toggle\']',
            postInteractionWait: 3000,
        },
        {
            label: 'Profile Promocode',
            url: `/users/promocode`,
            cookies,
            readySelector: '.profile [data-test=\'profile__input--promocode\']',
        },
        {
            label: 'Profile Verification',
            url: `/users/verification`,
            cookies,
            readySelector: '.verification .verification-state-card',
        },
        {
            label: 'Profile Level',
            url: `/users/level`,
            cookies,
            readySelector: '.profile .level-card',
        },
        {
            label: 'PersonalLimits DepositLimits',
            url: `/users/limits`,
            cookies,
            delay: 3000,
            readySelector: '.header__wrapper',
        },
        {
            label: 'PersonalLimits AddDepositLimit',
            url: `/users/limits`,
            cookies,
            delay: 3000,
            clickSelector: '[data-test=\'add-deposit-limit-button\']',
            postInteractionWait: 3000,
        },
        {
            label: 'PersonalLimits ManageDepositLimit',
            url: `/users/limits`,
            cookies,
            delay: 3000,
            clickSelector: '[data-test=\'manage-limit-daily-button\']',
            postInteractionWait: 3000,
        },
        {
            label: 'FAQ',
            url: `/faq`,
            delay: 3000,
            cookies,
            readySelector: '.header__wrapper',
        },
        {
            label: 'Verification',
            url: `/verification`,
            delay: 3000,
            cookies,
            readySelector: '.header__wrapper',
        },
        {
            label: 'CashboxDashboard',
            url: `#modal-cashbox`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="modal-cashbox"]',
        },
        {
            label: 'CashboxStepWithdrawPayments',
            url: `#modal-cashbox-withdraw`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="modal-cashbox-withdraw"]',
        },
        {
            label: 'CashboxStepWithdrawAmount',
            url: `#modal-cashbox-withdraw`,
            cookies,
            delay: 3000,
            clickSelectors: [ '[data-test="modal-cashbox-withdraw"] .payments-item' ],
            postInteractionWait: 3000,
        },
        {
            label: 'CashboxStepDepositPayments',
            url: `#modal-cashbox-deposit`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="modal-cashbox-deposit"]',
        },
        {
            label: 'CashboxStepDepositAmount',
            url: `#modal-cashbox-deposit`,
            cookies,
            delay: 3000,
            clickSelectors: [ '[data-test="modal-cashbox-deposit"] .payments-item' ],
            postInteractionWait: 3000,
        },
        {
            label: 'CashboxStepDepositDeposit',
            url: `#modal-cashbox-deposit`,
            cookies,
            delay: 3000,
            clickSelectors: [ '[data-test="modal-cashbox-deposit"] .payments-item', '.deposit-button' ],
            postInteractionWait: 3000,
        },
        {
            label: 'CashboxStepWithdrawRequests',
            url: `#modal-cashbox-withdraw-requests`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="modal-cashbox-withdraw-requests"]',
            postInteractionWait: 3000,
        },
        {
            label: 'CashboxStepWithdrawMessages',
            url: `#modal-cashbox-withdraw-messages`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="modal-cashbox-withdraw-messages"]',
            postInteractionWait: 3000,
        },
        {
            label: 'CashboxServiceWorks',
            url: `#modal-cashbox-service-works`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="modal-cashbox-service-works"]',
            postInteractionWait: 3000,
        },
        {
            label: 'Balance dropdown',
            url: ``,
            cookies,
            delay: 3000,
            clickSelector: '.header__user-balance',
            postInteractionWait: 1000,
        },
        {
            label: 'Support List',
            url: ``,
            cookies,
            delay: 3000,
            clickSelectors: [ '.header [data-test=\'chat-button\']' ],
            clickSelectorsMobile: [ '[data-test=\'bottom-menu-more\']', '.sidebar [data-test=\'chat-button\']' ],
            scrollToSelector: '.sidebar .vip-manager',
            postInteractionWait: 3000,
        },
        {
            label: 'Callback',
            url: `#modal-callback`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="modal-callback"]',
        },
        {
            label: 'Notifications List',
            url: ``,
            cookies,
            delay: 1000,
            clickSelectors: [ '[data-test=\'notifications-button\']' ],
            clickSelectorsMobile: [ '[data-test=\'bottom-menu-more\']' ],
            readySelector: '.fe-notice',
            postInteractionWait: 2000,
        },
        {
            label: 'Casino bonus in profile',
            url: `/users/bonuses/casino`,
            cookies,
            delay: 3000,
            readySelector: '[data-test=\'bonus-item\']',
        },
        {
            label: 'Sport bonus in profile',
            url: `/users/bonuses/sport`,
            cookies,
            delay: 3000,
            readySelector: '[data-test=\'bonus-item\']',
        },
        {
            label: 'Pop-up details casino bonus in profile',
            url: `/users/bonuses/casino`,
            cookies,
            delay: 3000,
            clickSelectors: [ '[data-test=\'bonus-item\'] [data-test=\'bonus-details-button\']' ],
            postInteractionWait: 3000,
        },
        {
            label: 'Cancel Pop-up casino bonus in profile',
            url: `#bonus-cancel`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="bonus-cancel"]',
        },
        {
            label: 'Pop-up details sport bonus in profile',
            url: `/users/bonuses/sport`,
            cookies,
            delay: 3000,
            clickSelectors: '[data-test=\'bonus-item\'] [data-test=\'bonus-details-button\']',
            postInteractionWait: 3000,
        },
        {
            label: 'History casino bonus in profile',
            url: `/users/bonuses/casino`,
            cookies,
            delay: 3000,
            readySelector: '.profile-bonuses [data-test=\'profile-bonuses-history\']',
            clickSelectors: [ ' [data-test=\'profile-bonuses-history\'] .accordion-menu__activator' ],
            scrollToSelector: '.profile-bonuses__history [data-test=\'bonus-item\']',
            postInteractionWait: 3000,
        },
        {
            label: 'History sport bonus in profile',
            url: `/users/bonuses/sport`,
            cookies,
            readySelector: '.profile-bonuses',
            clickSelector: [ '[data-test=\'profile-bonuses-history\'] .accordion-menu__activator' ],
            scrollToSelector: '[data-test=\'profile-bonuses-history\'] .bonus-item',
            postInteractionWait: 3000,
        },
        {
            label: 'Daily Deposit Insurance',
            url: `/users/bonuses/insurance`,
            cookies,
            delay: 3000,
            readySelector: '[data-test=\'bonus-item\']',
        },
        {
            label: 'Daily Deposit Insurance Details Popup',
            url: `/users/bonuses/insurance`,
            cookies,
            delay: 3000,
            clickSelectors: '[data-test=\'bonus-item\'] [data-test=\'bonus-details-button\']',
            postInteractionWait: 3000,
        },
        {
            label: 'Login',
            url: `/login`,
            delay: 3000,
            readySelector: '.popup',
        },
        {
            label: 'Registration',
            url: `/registration`,
            delay: 3000,
            readySelector: '.popup',
        },
        {
            label: 'Popup Leave now open',
            url: `/registration`,
            clickSelectors: [ '.logo' ],
            postInteractionWait: 3000,
            readySelector: '.popup',
        },
        {
            label: 'Remind',
            url: `/remind`,
            delay: 3000,
            readySelector: '.popup',
        },
        {
            label: 'Personal data auth Popup Leave now',
            url: `#confirm-exit`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="confirm-exit"]',
        },
        {
            label: 'Limits Suspended popup',
            url: `#modal-game-suspended`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="modal-game-suspended"]',
        },
        {
            label: 'Limits Cooling Off popup',
            url: `#game-cooling-off`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="game-cooling-off"]',
        },
        {
            label: 'Deposit bonus balance info popup',
            url: `#deposit-bonus-balance-info`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="deposit-bonus-balance-info"]',
        },
        {
            label: 'Deposit insurance request denied popup',
            url: `#modal-deposit-insurance`,
            cookies,
            delay: 3000,
            readySelector: '[data-test="modal-deposit-insurance"]',
        },
        {
            label: '404',
            url: `/sdfsdfsfsdf`,
        },
    ];
}
