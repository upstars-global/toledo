export default function getScenarios(hostName: string) {
    return [
        {
            label: "Homepage",
            url: `http://${ hostName }/`,
        },
        {
            label: "Login",
            url: `http://${ hostName }/login`,
        },
        {
            label: "Registration",
            url: `http://${ hostName }/registration`,
        },
        {
            label: "terms-and-conditions",
            url: `http://${ hostName }/terms-and-conditions`,
        },
        {
            label: "vip",
            url: `http://${ hostName }/vip`,
        },
        {
            label: "benefits-of-crypto",
            url: `http://${ hostName }/benefits-of-crypto`,
        },
        {
            label: "faq",
            url: `http://${ hostName }/faq`,
        },
        {
            label: "support",
            url: `http://${ hostName }/support`,
        },
        {
            label: "sport/registration",
            url: `http://${ hostName }/sport/registration`,
        },
        {
            label: "sport/login",
            url: `http://${ hostName }/sport/login`,
        },
    ];
}
