import { Request, Response } from "express";
import command from "../../backstop";
import { getTestUrlByTask } from "../../helpers/hostHelper";

export default function reference(req: Request, res: Response) {
    const {
        hostName,
        project,
    } = req.query

    command('reference', {
        hostName: hostName || getTestUrlByTask({
            project: String(project),
        }),
        project,
        testId: '',
    }).then(() => {
        console.log('complete')
    }).catch((err: Error) => {
        console.log(err)
        console.log('error')
    }).finally(() => {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.send('ok')
    })
}
