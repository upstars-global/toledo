import { Request, Response } from 'express'
import command from '../backstop'

module.exports = function startRoute(req: Request, res: Response) {
    const {
        hostName,
        project,
        testId,
    } = req.query;

    command('test', {
        hostName,
        project,
        testId,
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