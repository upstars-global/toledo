import { config } from 'dotenv'
import { Request, Response } from 'express'
config()
import command from '../backstop'
import SlackService from "../services/SlackService";
import * as process from "process";

export const HOST_CONFIG: Record<string, string> = {
    "alpa": String(process.env.ALPA_ADDR),
    "thor": String(process.env.THOR_ADDR)
}

console.log(HOST_CONFIG)

export default function startRoute(req: Request, res: Response) {
    const {
        hostName,
        project,
        testId,
        dyn,
    } = req.query;

    let test_id = testId;
    let host = HOST_CONFIG[String(project)]
    if (dyn) {
        test_id = String(dyn);
        host = `frontera-${ test_id.toLowerCase() }-ss-alpa-develop-mock.alpa.svc.cluster.local`
        // host = `https://mock-${ test_id.toLowerCase() }-ss.develop.rocketplay.com`
    }

    command('test', {
        hostName: hostName || host,
        project,
        testId: test_id,
    }).then(() => {
        console.log('complete')
    }).catch((err: Error) => {
        SlackService.send(project as string, test_id as string);
        console.log(err)
        console.log('error')
    }).finally(() => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send('ok')
    })
}