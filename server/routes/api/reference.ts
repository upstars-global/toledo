/* eslint-disable no-console */
import { Request, Response } from 'express';
import command from '../../backstop';
import { getTestUrlByTask } from '../../helpers/hostHelper';
import { MOCK_ADDR } from '@config';

export default function reference(req: Request, res: Response) {
    const { project } = req.query;

    command('reference', {
        hostName: MOCK_ADDR || getTestUrlByTask({
            project: String(project),
        }),
        project,
        testId: '',
        selectedScenariosLabels: req.body,
    }).then(() => {
        console.log('complete');
    }).catch((err: Error) => {
        console.log(err);
        console.log('error');
    }).finally(() => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send('ok');
    });
}
