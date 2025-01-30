import express, { NextFunction, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'

import apiRouter from './routes/api';
import reportRouter from './routes/report';
import configRouter from './routes/config';

const app = express();
const port = 3000;

app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Cache-Control', 'private');
    next();
});

app.get('/', (_req: Request, res: Response) => {
    res.redirect('/api/docs');
})
app.use(express.json());
app.use('/api', apiRouter());
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/config.js', configRouter);
app.get('/report', reportRouter);

app.use('/assets', express.static('./assets'));
app.use('/test', express.static('./backstop/test'));
app.use('/reference', express.static('./backstop/reference/images'));

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Example app listening on port ${port}`);
});
