const backstop = require("backstopjs");
const fs = require("fs");

const defaultScenarios = JSON.parse(fs.readFileSync("./defaultScenarios.json"));

function getPaths(project) {
    return {
        bitmaps_reference: `bitmaps_reference/${ project }`,
        bitmaps_test: `bitmaps_test/${ project }`,
        ci_report:  `ci_report/${ project }`,
        engine_scripts: "backstop_data/engine_scripts",
    };
}

function getScenarios(hostName) {
    const pagesConfig = [
        {
            label: "BackstopJS Homepage",
            url: `https://${ hostName }/`,
        },
        {
            label: "BackstopJS Login",
            url: `https://${ hostName }/`,
            clickSelector: ".enter-btns-log",
            postInteractionWait: 1500,
        },
        {
            label: "BackstopJS Registration",
            url: `https://${ hostName }/`,
            clickSelector: ".enter-btns-reg",
            postInteractionWait: 1500,
        },
        {
            label: "BackstopJS Tournaments",
            url: `https://${ hostName }/tournaments/all`,
        },
        {
            label: "BackstopJS Quest",
            url: `https://${ hostName }/action/gravity-rise`,
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
    const file = JSON.parse(fs.readFileSync("./defaultConfig.json"));

    file.paths = getPaths(project);
    file.scenarios = getScenarios(hostName);

    return backstop(command, {
        config: file,
    });
};
