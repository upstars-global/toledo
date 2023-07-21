import { config } from 'dotenv'
import { Request, Response } from 'express'
config()
import command from '../backstop'
import SlackService from "../services/SlackService";
import { getTestUrlByTask} from "helpers/hostHelper";

export default function startRoute(req: Request, res: Response) {
    const {
        hostName,
        project,
        testId,
        dyn,
    } = req.query;

    let taskId = String(dyn || '') || String(testId);
    const host = getTestUrlByTask({
        task: String(dyn) || '',
        project: String(project),
    })

    console.log('Host: ', host)

    command('test', {
        hostName: hostName || host,
        project,
        testId: taskId,
    }).then(() => {
        console.log('complete')
    }).catch((err: Error) => {
        SlackService.send(project as string, taskId);
        console.log(err)
        console.log('error')
    }).finally(() => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send('ok')
    })
}