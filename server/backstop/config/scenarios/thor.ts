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
        }
    ];
}