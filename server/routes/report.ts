import {Request, Response} from "express";
import path from "path";

/**
 * @swagger
 * /report:
 *   get:
 *     summary: Получение отчета прохождения тестов
 *     tags:
 *       - Общие роуты
 *     description: Get report
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: query
 *         name: test
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя test для отображения
 *     responses:
 *       200:
 *         description: Successfully retrieved html
 *
 * @param {Object} req - Express.js request object. The query parameters should include 'field1' and/or 'field2'.
 * @param {Object} res - Express.js response object for sending back the generated results.
 */
export default function report(req: Request, res: Response)  {
    res.sendFile(path.join(__dirname, '../assets/index.html'));
}