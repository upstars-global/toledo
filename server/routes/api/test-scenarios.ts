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
        service,
    } = req.query;
    const host = getTestUrlByTask(String(service));
    const scenarios = getPages(host);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify(scenarios));
}
