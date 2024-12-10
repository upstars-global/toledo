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
 *         name: project
 *         required: true
 *         schema:
 *           type: string
 *           enum: [alpa, thor]
 *         description: Имя проекта, в котором находится директория (только `alpa` или `thor`)
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
        project,
        folder,
    } = req.query;

    const pathName = path.join(__dirname, `../../backstop/test/${project}/${folder}`);
    rmSync(pathName, { recursive: true, force: true });

    res.send(folder);
}
