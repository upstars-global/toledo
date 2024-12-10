/* eslint-disable no-console */
import { Request, Response } from 'express';
import command from '../../backstop';
import { getTestUrlByTask } from '../../helpers/hostHelper';
import { MOCK_ADDR } from '@config';

/**
 * @swagger
 *
 * /api/reference:
 *   get:
 *     summary: Создание новых эталонов
 *     description: Create new references
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: project
 *         required: true
 *         schema:
 *           type: string
 *           enum: [alpa, thor]
 *         description: Имя проекта, для которого запускается тест (только `alpa` или `thor`)
 *     responses:
 *      200:
 *         description: ok в любом случае
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *
 * @param {Object} req - Express.js request object. The query parameters should include 'field1' and/or 'field2'.
 * @param {Object} res - Express.js response object for sending back the generated results.
 */
export default function reference(req: Request, res: Response) {
    const { project } = req.query;

    command('reference', {
        hostName: MOCK_ADDR || getTestUrlByTask({
            project: String(project),
        }),
        project,
        testId: '',
        selectedScenariosLabels: req.body,
    }).then(() => {
        console.log('complete');
    }).catch((err: Error) => {
        console.log(err);
        console.log('error');
    }).finally(() => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('ok');
    });
}
