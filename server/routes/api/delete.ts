import { Request, Response } from 'express';
import { rmSync } from 'fs';
import path from 'path';

export default function deleteRoute(req: Request, res: Response) {
    const {
        project,
        folder,
    } = req.query;

    const pathName = path.join(__dirname, `../../backstop/test/${project}/${folder}`);
    rmSync(pathName, { recursive: true, force: true });

    res.send(folder);
}
