import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

import getScenarios from '../../helpers/getScenarios';

interface IScenario {
    label?: string
}

interface IReferenceListItem {
    name: string,
    image: string
}

interface IReferenceImageRecord extends IReferenceListItem {
    viewportIndex: number
}

interface IReferenceImages {
    [label: string]: IReferenceImageRecord[]
}

const REFERENCE_IMAGES_PATH = path.join(__dirname, '../../backstop/reference/images');
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

function getReferenceImages(files: string[], scenarios: IScenario[]): IReferenceImages {
    const scenarioLabels = scenarios.reduce<Record<string, string>>((accumulator, { label }) => {
        if (!label) {
            return accumulator;
        }

        accumulator[makeSafeLabel(label)] = label;

        return accumulator;
    }, {});
    const labels = Object.keys(scenarioLabels).sort((a, b) => b.length - a.length);

    if (!labels.length) {
        return {};
    }

    const labelPattern = labels
        .map(escapeRegExp)
        .join('|');
    const scenarioPattern = new RegExp(`^${escapeRegExp(CONFIG_ID)}_(${labelPattern})_\\d+_.*_(\\d+)_([^_.]+)\\.(png|jpe?g)$`, 'i');

    const images = files.reduce<IReferenceImages>((accumulator, file) => {
        const [, label, viewportIndex, viewport] = file.match(scenarioPattern) || [];

        if (!label) {
            return accumulator;
        }

        accumulator[label] = accumulator[label] || [];
        accumulator[label].push({
            name: `${scenarioLabels[label]} ${viewport}`,
            viewportIndex: Number(viewportIndex),
            image: `${REFERENCE_IMAGE_ROUTE}/${file}`,
        });

        return accumulator;
    }, {});

    Object.values(images).forEach((references) => {
        references.sort((first, second) => first.viewportIndex - second.viewportIndex);
    });

    return images;
}

function getScenarioReferenceImages(label: string, images: IReferenceImages): IReferenceListItem[] {
    return (images[makeSafeLabel(label)] || []).map(({ image, name }) => ({
        image,
        name,
    }));
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

        accumulator.push(...getScenarioReferenceImages(scenario.label, images));

        return accumulator;
    }, []);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(list);
}
