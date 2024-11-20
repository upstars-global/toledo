import { Request, Response } from 'express';
import { getTestUrlByTask } from '../../helpers/hostHelper';
import getPages from '../../backstop/config/scenarios';

export function getScenariosProject(req: Request, res: Response) {
    const {
        project,
        dyn,
    } = req.query;
    const host = getTestUrlByTask({
        task: String(dyn || ''),
        project: String(project),
    });
    const scenarios = getPages(project as 'alpa' | 'thor', host);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    res.status(201).send(JSON.stringify(scenarios));
}
