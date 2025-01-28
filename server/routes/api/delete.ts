import { Request, Response } from 'express';
import { rmSync } from 'fs';
import path from 'path';

/**
 * @swagger
 * /api/delete:
 *   delete:
 *     summary: Удаление директории
 *     description: Удаляет указанную директорию в проекте на сервере.
 *     parameters:
 *       - in: query
 *         name: folder
 *         required: true
 *         schema:
 *           type: string
 *         description: Имя директории, которую нужно удалить
 *     responses:
 *       200:
 *         description: Имя удалённой директории
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Ошибка сервера
 */
export default function deleteRoute(req: Request, res: Response) {
    const {
        folder,
    } = req.query;

    const pathName = path.join(__dirname, `../../backstop/test/${folder}`);
    rmSync(pathName, { recursive: true, force: true });

    res.send(folder);
}
