import { Request, Response } from 'express';
import command from '../../backstop';
import SlackService from '../../services/SlackService';
import { getTestUrlByTask } from '../../helpers/hostHelper';
import { cpSync } from 'fs';
import path from 'path';
import { MOCK_ADDR } from '@config';
import { getTestResult } from '../../helpers/getTestResult';

function getCurrentFormattedTime() {
    const now = new Date();
    const year = now.getFullYear().toString().padStart(4, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

function copyReference(folder: string) {
    const srcPathName = path.join(__dirname, `../../backstop/reference`);
    const destPathName = path.join(__dirname, `../../backstop/test/${folder}/reference`);
    cpSync(srcPathName, destPathName, { recursive: true });
}

/**
 * @swagger
 * /api/start:
 *   get:
 *     summary: Запуск теста
 *     description: Инициализирует процесс тестирования для указанного проекта и теста.
 *     parameters:
 *       - in: query
 *         name: testId
 *         required: true
 *         schema:
 *           type: string
 *         description: Уникальный идентификатор теста
 *       - in: query
 *         name: dyn
 *         required: false
 *         schema:
 *           type: string
 *         description: Динамическая настройка для теста (опционально)
 *     responses:
 *       200:
 *         description: Тест успешно запущен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Сообщение о результате
 *                   example: "Тест успешно запущен"
 */
export default function startRoute(req: Request, res: Response) {
    const {
        testId,
        dyn,
    } = req.query;

    const taskId = String(dyn || '') || String(testId || '');
    const host = getTestUrlByTask({
        task: String(dyn || ''),
    });

    const folder = taskId || getCurrentFormattedTime();
    copyReference(folder);

    console.log('Host: ', host);
    const start = Date.now();
    command('test', {
        hostName: MOCK_ADDR || host,
        testId: folder,
        selectedScenariosLabels: req.body,
    }).then(() => {
        console.log('complete');
    }).catch((err: Error) => {
        console.log(err);
        console.log('error');
    }).finally(() => {
        const end = Date.now();
        console.log(`Test take: ${end - start} ms`)
        SlackService.send({
            testId: taskId,
            ...getTestResult(`backstop/test/${folder}`),
            time: end - start
        },);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('ok');
    });
}
