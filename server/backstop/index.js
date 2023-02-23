const backstop = require("backstopjs");
const fs = require("fs");

const defaultScenarios = JSON.parse(fs.readFileSync("./backstop/config/defaultScenarios.json"));

function getPaths(project) {
    return {
        bitmaps_reference: `backstop/reference/${ project }`,
        bitmaps_test: `backstop/test/${ project }`,
        html_report: `backstop/data/html_report/${ project }`,
        ci_report:  `backstop/data/ci_report/${ project }`,
        engine_scripts: "backstop/data/engine_scripts",
    };
}

function getScenarios(hostName) {
    const pagesConfig = [
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
            url: `https://${ hostName }/support`,
        },
        {
            label: "sport/registration",
            url: `https://${ hostName }/sport/registration`,
        },
        {
            label: "sport/login",
            url: `https://${ hostName }/sport/login`,
        },
    ];
    const scenarios = [];

    pagesConfig.forEach((config) => {
        scenarios.push({
            ...defaultScenarios,
            ...config,
        });
    });

    return scenarios;
}


module.exports = function(command, { hostName, project }) {
    const file = JSON.parse(fs.readFileSync("./backstop/config/defaultConfig.json"));

    file.paths = getPaths(project);
    file.scenarios = getScenarios(hostName);

    return backstop(command, {
        config: file,
    });
};
