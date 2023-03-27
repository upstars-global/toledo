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
            label: "Remind",
            url: `http://${ hostName }/remind`,
        },
        {
            label: "Category 'Top'",
            url: `http://${ hostName }/slots/top`,
        },
        {
            label: "Producer 'Playn & go'",
            url: `http://${ hostName }/producers/playngo`,
        },
    ];
}
