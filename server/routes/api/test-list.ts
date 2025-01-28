import { Request, Response } from 'express';
import { getTestResult } from '../../helpers/getTestResult';
import path from 'path';

const fs = require('fs');

/**
 * @swagger
 *
 * /api/test-list:
 *   get:
 *     summary: Получения списков прошедших тестов
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
export default function testList(req: Request, res: Response) {
    const projectPath = path.join(__dirname, `../../backstop/test`);
    fs.readdir(projectPath, null, (err: Error, files: string[]) => {
        if (err) {
            throw err;
        }

        const index = files.indexOf('.gitkeep');
        if (index > -1) {
            files.splice(index, 1);
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        res.send(files.map((test) => {
            return {
                name: test,
                result: getTestResult(path.join(projectPath, test)),
            };
        }));
    });
}
