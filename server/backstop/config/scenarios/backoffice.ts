export default function getScenarios(host: string) {
    return [
        {
            label: 'Homepage',
            url: `${host}/`,
            delay: 3000,
        },
    ];
}
