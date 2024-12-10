import { Request, Response } from 'express';
import { getTestUrlByTask } from '../../helpers/hostHelper';
import getPages from '../../backstop/config/scenarios';

/**
 * @swagger
 *
 * /api/test-scenarios:
 *   get:
 *     summary: Получения списка сценариев
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
export function getScenariosProject(req: Request, res: Response) {
    const {
        project,
        dyn,
    } = req.query;
    const host = getTestUrlByTask({
        task: String(dyn || ''),
        project: String(project),
    });
    const scenarios = getPages(project as 'alpa' | 'thor', host);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify(scenarios));
}
