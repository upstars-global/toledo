const backstop = require("backstopjs");
const fs = require("fs");

const file = JSON.parse(fs.readFileSync("./defaultConfig.json"));
const defaultScenarios = JSON.parse(fs.readFileSync("./defaultScenarios.json"));

const project = "alpa";
file.paths = {
    bitmaps_reference: `test${ project }/bitmaps_reference`,
    bitmaps_test: `test${ project }/bitmaps_test`,
    html_report: `test${ project }/html_report`,
    engine_scripts: "backstop_data/engine_scripts",
};

const hostName = "rocketplay.com";
const pagesConfig = [
    {
        label: "BackstopJS Homepage",
        url: `https://${ hostName }/`,
    },
    {
        label: "BackstopJS Login",
        url: "https://rocketplay.com/",
        clickSelector: ".enter-btns-log",
        postInteractionWait: 1500,
    },
    {
        label: "BackstopJS Registration",
        url: "https://rocketplay.com/",
        clickSelector: ".enter-btns-reg",
        postInteractionWait: 1500,
    },
    {
        label: "BackstopJS Tournaments",
        url: "https://rocketplay.com/tournaments/all",
    },
    {
        label: "BackstopJS Quest",
        url: "https://rocketplay.com/action/gravity-rise",
    },
];

pagesConfig.forEach((config) => {
    file.scenarios.push({
        ...defaultScenarios,
        ...config,
    });
});


// backstop("reference", {
//   config: file
// });
// return;
module.exports = function() {
    return backstop("test", {
        config: file,
    });
};
