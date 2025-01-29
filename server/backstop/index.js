import getPages from './config/scenarios';

const backstop = require('backstopjs');
const fs = require('fs');

const defaultScenarios = JSON.parse(fs.readFileSync('./backstop/config/defaultScenarios.json'));

function getPaths(command, folder) {
    return {
        bitmaps_reference: command === 'reference'
            ? `backstop/reference/images`
            : `backstop/test/${folder}/reference`,
        bitmaps_test: `backstop/test`,
        html_report: `backstop/data/html_report`,
        ci_report: `backstop/data/ci_report`,
        engine_scripts: 'backstop/data/engine_scripts',
    };
}

function getScenarios() {
    const pagesConfig = getPages();
    const scenarios = [];

    pagesConfig.forEach((config) => {
        scenarios.push({
            ...defaultScenarios,
            ...config,
        });
    });

    return scenarios;
}

import { NODE_ENV } from '@config';

export default function commandFn(command, { hostName, testId, selectedScenariosLabels = [] }) {
    const file = JSON.parse(
        fs.readFileSync(`./backstop/config/${NODE_ENV ? 'defaultConfigDev' : 'defaultConfig'}.json`),
    );

    file.paths = getPaths(command, testId);
    const allScenarios = getScenarios();
    allScenarios.map((scenario) => {
        scenario.url = `${hostName}${scenario.url}`
    })

    if (selectedScenariosLabels.length) {
        file.scenarios = allScenarios.filter(({ label }) => {
            return selectedScenariosLabels.includes(label);
        });
    } else {
        file.scenarios = allScenarios;
    }

    if (testId) {
        file.dynamicTestId = testId;
    }

    return backstop(command, {
        config: file,
    });
}
