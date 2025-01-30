import { Request, Response } from 'express';
import getScenarios from '../../backstop/config/scenarios';

/**
 * @swagger
 *
 * /api/test-scenarios:
 *   get:
 *     summary: Получения списка сценариев
 *     tags:
 *       - Основные API
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
    const scenarios = getScenarios();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(scenarios));
}
