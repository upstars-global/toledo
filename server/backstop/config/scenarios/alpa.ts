export default function getScenarios(hostName: string) {
    return [
        {
            label: "Homepage",
            url: `http://${ hostName }/`,
            delay: 2500,
            readySelector: ".jackpot-item",
        },
        {
            label: "Homepage auth",
            url: `http://${ hostName }/`,
            cookiePath: "backstop/data/engine_scripts/cookies.json",
            delay: 2500,
            readySelector: ".jackpot-item",
        },
        // {
        //     label: "Deposit",
        //     url: `http://${ hostName }/`,
        //     cookiePath: "backstop/data/engine_scripts/cookies.json",
        //     clickSelector: "[data-test=\"header__deposit-btn\"]",
        //     delay: 2500,
        // },
        {
            label: "Profile",
            url: `http://${ hostName }/users/`,
            cookiePath: "backstop/data/engine_scripts/cookies.json",
            delay: 2500,
        },
        {
            label: "Profile level",
            url: `http://${ hostName }/users/level`,
            cookiePath: "backstop/data/engine_scripts/cookies.json",
            delay: 2500,
        },
        {
            label: "Profile gifts",
            url: `http://${ hostName }/users/gifts`,
            cookiePath: "backstop/data/engine_scripts/cookies.json",
            delay: 2500,
        },
        {
            label: "Profile verification",
            url: `http://${ hostName }/users/verification`,
            cookiePath: "backstop/data/engine_scripts/cookies.json",
            delay: 2500,
        },
        {
            label: "Profile limits",
            url: `http://${ hostName }/users/limits`,
            cookiePath: "backstop/data/engine_scripts/cookies.json",
            delay: 2500,
        },
        {
            label: "Profile security",
            url: `http://${ hostName }/users/security`,
            cookiePath: "backstop/data/engine_scripts/cookies.json",
            delay: 2500,
        },
        {
            label: "Profile games-history",
            url: `http://${ hostName }/users/games-history`,
            cookiePath: "backstop/data/engine_scripts/cookies.json",
            delay: 2500,
        },
        {
            label: "Login",
            url: `http://${ hostName }/login`,
            delay: 2500,
        },
        {
            label: "Registration",
            url: `http://${ hostName }/registration`,
            delay: 2500,
        },
        {
            label: "terms-and-conditions",
            url: `http://${ hostName }/terms-and-conditions`,
            delay: 2500,
        },
        {
            label: "vip",
            url: `http://${ hostName }/vip`,
            delay: 2500,
        },
        {
            label: "benefits-of-crypto",
            url: `http://${ hostName }/benefits-of-crypto`,
            delay: 2500,
        },
        {
            label: "faq",
            url: `http://${ hostName }/faq`,
            delay: 2500,
        },
        {
            label: "support",
            url: `http://${ hostName }/support`,
            delay: 2500,
        },
        {
            label: "sport/registration",
            url: `http://${ hostName }/sport/registration`,
            delay: 2500,
        },
        {
            label: "sport/login",
            url: `http://${ hostName }/sport/login`,
            delay: 2500,
        },
    ];
}
