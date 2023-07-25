import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export default function deleteRoute(req: Request, res: Response) {
    const {
        project,
        folder,
    } = req.query;

    const pathName = path.join(__dirname, `../../backstop/test/${project}/${folder}`)
    fs.rmSync(pathName, { recursive: true, force: true });

    res.send(folder)
}