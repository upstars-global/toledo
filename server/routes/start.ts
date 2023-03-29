import { Request, Response } from 'express'
import command from '../backstop'
import SlackService from "../services/SlackService";
import * as process from "process";

const HOST_CONFIG: Record<string, string> = {
    "alpa": String(process.env.ALPA_ADDR),
    "thor": String(process.env.THOR_ADDR)
}

console.log(HOST_CONFIG)

module.exports = function startRoute(req: Request, res: Response) {
    const {
        hostName,
        project,
        testId,
    } = req.query;

    command('test', {
        hostName: hostName || HOST_CONFIG[String(project)],
        project,
        testId,
    }).then(() => {
        console.log('complete')
    }).catch((err: Error) => {
        SlackService.send(project as string, testId as string);
        console.log(err)
        console.log('error')
    }).finally(() => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send('ok')
    })
}