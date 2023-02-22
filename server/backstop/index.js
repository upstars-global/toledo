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
            label: "BackstopJS Homepage",
            url: `http://${ hostName }/`,
        },
        {
            label: "BackstopJS Login",
            url: `http://${ hostName }/login`,
        },
        {
            label: "BackstopJS Registration",
            url: `http://${ hostName }/registration`,
        },
        // {
        //     label: "BackstopJS Tournaments",
        //     url: `https://${ hostName }/tournaments/all`,
        // },
        // {
        //     label: "BackstopJS Quest",
        //     url: `https://${ hostName }/action/gravity-rise`,
        // },
        // {
        //     label: "BackstopJS vip page",
        //     url: `https://${ hostName }/vip`,
        // },
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
