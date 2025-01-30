import {Request, Response} from "express";
import fs from "fs";
import path from "path";

export default function config(req: Request, res: Response) {
    const referrer = new URL(String(req.headers.referer));

    fs.readFile(path.join(
        __dirname,
        `../backstop/test`,
        String(referrer.searchParams.get('test')),
        'report.json',
    ), { encoding: 'utf8' }, (_error: unknown, file: string) => {
        res.setHeader('Content-Type', 'application/javascript');
        res.send(`report(${file})`);
    });
}
