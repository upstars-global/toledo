import { Request, Response } from 'express';
import du from 'du';

const PATHS = {
    TESTS: './backstop/test',
    REFERENCE: './backstop/reference',
};

function getFolderSize(folderPath: string): Promise<number | 'error'> {
    return new Promise((resolve) => {
        du(folderPath, (err, size) => {
            if (err || !size) {
                // eslint-disable-next-line no-console
                console.error(err);
                resolve('error');
            } else {
                // Преобразуем размер в мегабайты
                const folderSizeInMegabytes = size / (1024 * 1024);
                resolve(folderSizeInMegabytes);
            }
        });
    });
}

/**
 * @swagger
 *
 * /api/spase-usage:
 *   get:
 *     summary: Получение данных о диске с тестами
 *     description: Get application list
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Успешный ответ с размерами папок
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 testFolderSize:
 *                   type: number
 *                   description: Размер папки "tests" в байтах
 *                   example: 1048576
 *                 referenceFolderSize:
 *                   type: number
 *                   description: Размер папки "reference" в байтах
 *                   example: 524288
 *       500:
 *         description: Ошибка сервера
 *
 * @param {Object} req - Express.js request object. The query parameters should include 'field1' and/or 'field2'.
 * @param {Object} res - Express.js response object for sending back the generated results.
 */
export default async function (req: Request, res: Response) {
    const testFolderSize = await getFolderSize(PATHS.TESTS);
    const referenceFolderSize = await getFolderSize(PATHS.REFERENCE);

    res.send({
        testFolderSize,
        referenceFolderSize,
    });
}
