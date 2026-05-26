import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import getScenarios from '../../helpers/getScenarios';

interface IScenario {
    label?: string
}

interface IReferenceListItem {
    name: string,
    image: string | null
}

const REFERENCE_IMAGES_PATH = path.join(__dirname, '../../backstop/reference/images');
const LOCAL_CHART_SCENARIOS_PATH = path.join(__dirname, '../../../charts/scenarios/index.json');
const REFERENCE_IMAGE_ROUTE = '/reference';
const CONFIG_ID = 'backstop_default';
const IMAGE_EXTENSION_REGEXP = /\.(png|jpe?g)$/i;

function makeSafeLabel(label: string): string {
    return label
        .replace(/[ /]/g, '_')
        .replace(/[^a-z0-9_-]/gi, '');
}

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getReferenceImage(label: string, files: string[]): string | null {
    const scenarioPattern = new RegExp(`^${escapeRegExp(CONFIG_ID)}_${escapeRegExp(makeSafeLabel(label))}_\\d+_`);
    const scenarioFiles = files.filter((file) => (
        scenarioPattern.test(file)
    ));

    const image = scenarioFiles.find((file) => /_desktop\.(png|jpe?g)$/i.test(file)) || scenarioFiles[0];

    return image ? `${REFERENCE_IMAGE_ROUTE}/${image}` : null;
}

function getReferenceScenarios(): IScenario[] {
    let scenarios: IScenario[] = [];

    try {
        scenarios = getScenarios() as IScenario[];
    } catch (err) {
        console.log(err);
    }

    if (scenarios.length) {
        return scenarios;
    }

    try {
        return JSON.parse(fs.readFileSync(LOCAL_CHART_SCENARIOS_PATH, 'utf8')) as IScenario[];
    } catch (err) {
        console.log(err);
        return scenarios;
    }
}

/**
 * @swagger
 *
 * /api/reference-list:
 *   get:
 *     summary: Получение списка референсных изображений сценариев
 *     tags:
 *       - Основные API
 *     description: Returns scenario names and links to their reference images
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *         description: Список сценариев с референсными изображениями
 */
export default function referenceList(req: Request, res: Response) {
    let files: string[] = [];

    try {
        files = fs.readdirSync(REFERENCE_IMAGES_PATH)
            .filter((file) => IMAGE_EXTENSION_REGEXP.test(file));
    } catch (err) {
        console.log(err);
    }

    const list = getReferenceScenarios().reduce<IReferenceListItem[]>((accumulator, scenario) => {
        if (!scenario.label) {
            return accumulator;
        }

        accumulator.push({
            name: scenario.label,
            image: getReferenceImage(scenario.label, files),
        });

        return accumulator;
    }, []);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.send(list);
}
