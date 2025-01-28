import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'

import path from 'path';
import fs from 'fs';

import apiRouter from './routes/api';

const app = express();
const port = 3000;

app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', 'private');
    next();
});

app.use(express.json());
app.use('/api', apiRouter());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/config.js', (req: Request, res: Response) => {
    const referrer = new URL(String(req.headers.referer));

    fs.readFile(path.join(
        __dirname,
        `./backstop/test`,
        String(referrer.searchParams.get('test')),
        'report.json',
    ), { encoding: 'utf8' }, (_error: unknown, file: string) => {
        res.setHeader('Content-Type', 'application/javascript');
        res.send(`report(${file})`);
    });
});

app.use('/assets', express.static('./assets'));
app.use('/test', express.static('./backstop/test'));
app.use('/reference', express.static('./backstop/reference'));

app.get('/report', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, './assets/index.html'));
});

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on port ${port}`);
});
