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

const getPages = require("./config/scenarios");
function getScenarios(project, hostName) {
    debugger;
    const pagesConfig = getPages.default(project)(hostName);
    const scenarios = [];

    pagesConfig.forEach((config) => {
        scenarios.push({
            ...defaultScenarios,
            ...config,
        });
    });

    return scenarios;
}


module.exports = function(command, { hostName, project, testId }) {
    const file = JSON.parse(fs.readFileSync("./backstop/config/defaultConfig.json"));

    file.paths = getPaths(project);
    file.scenarios = getScenarios(project, hostName);

    if (testId) {
        file.dynamicTestId = testId;
    }

    return backstop(command, {
        config: file,
    });
};
