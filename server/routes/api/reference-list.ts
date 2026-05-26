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

interface IReferenceImages {
    [label: string]: string
}

const REFERENCE_IMAGES_PATH = path.join(__dirname, '../../backstop/reference/images');
const REFERENCE_IMAGE_ROUTE = '/reference';
const CONFIG_ID = 'backstop_default';
const IMAGE_EXTENSION_REGEXP = /\.(png|jpe?g)$/i;
const DESKTOP_IMAGE_REGEXP = /_desktop\.(png|jpe?g)$/i;

function makeSafeLabel(label: string): string {
    return label
        .replace(/[ /]/g, '_')
        .replace(/[^a-z0-9_-]/gi, '');
}

function escapeRegExp(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getReferenceImages(files: string[], scenarios: IScenario[]): IReferenceImages {
    const labels = Array.from(new Set(
        scenarios
            .map(({ label }) => label && makeSafeLabel(label))
            .filter(Boolean) as string[]
    )).sort((a, b) => b.length - a.length);

    if (!labels.length) {
        return {};
    }

    const labelPattern = labels
        .map(escapeRegExp)
        .join('|');
    const scenarioPattern = new RegExp(`^${escapeRegExp(CONFIG_ID)}_(${labelPattern})_\\d+_`);

    return files.reduce<IReferenceImages>((accumulator, file) => {
        const [, label] = file.match(scenarioPattern) || [];

        if (!label || (accumulator[label] && !DESKTOP_IMAGE_REGEXP.test(file))) {
            return accumulator;
        }

        accumulator[label] = file;

        return accumulator;
    }, {});
}

function getReferenceImage(label: string, images: IReferenceImages): string | null {
    const image = images[makeSafeLabel(label)];

    return image ? `${REFERENCE_IMAGE_ROUTE}/${image}` : null;
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
export default function referenceList(_req: Request, res: Response) {
    let files: string[] = [];

    try {
        files = fs.readdirSync(REFERENCE_IMAGES_PATH)
            .filter((file) => IMAGE_EXTENSION_REGEXP.test(file));
    } catch (err) {
        console.log(err);
    }

    const scenarios = getScenarios() as IScenario[];
    const images = getReferenceImages(files, scenarios);

    const list = scenarios.reduce<IReferenceListItem[]>((accumulator, scenario) => {
        if (!scenario.label) {
            return accumulator;
        }

        accumulator.push({
            name: scenario.label,
            image: getReferenceImage(scenario.label, images),
        });

        return accumulator;
    }, []);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(list);
}
