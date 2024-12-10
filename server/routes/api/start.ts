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

function copyReference(project: string, folder: string) {
    const srcPathName = path.join(__dirname, `../../backstop/reference/${project}`);
    const destPathName = path.join(__dirname, `../../backstop/test/${project}/${folder}/reference`);
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
 *         name: project
 *         required: true
 *         schema:
 *           type: string
 *           enum: [alpa, thor]
 *         description: Имя проекта, для которого запускается тест (только `alpa` или `thor`)
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
        project,
        testId,
        dyn,
    } = req.query;

    const taskId = String(dyn || '') || String(testId || '');
    const projectName = String(project);
    const host = getTestUrlByTask({
        task: String(dyn || ''),
        project: projectName,
    });

    const folder = taskId || getCurrentFormattedTime();
    copyReference(projectName, folder);

    console.log('Host: ', host);
    const start = Date.now();
    command('test', {
        hostName: MOCK_ADDR || host,
        project: projectName,
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
            project: projectName,
            testId: taskId,
            ...getTestResult(`backstop/test/${project}/${folder}`),
            time: end - start
        },);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('ok');
    });
}
