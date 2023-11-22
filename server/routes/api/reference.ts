import {Request, Response, Router} from 'express'
import command from '../../backstop'
import { getTestUrlByTask } from '../../helpers/hostHelper'
import {MOCK_ADDR}from '@config'

function reference(req: Request, res: Response) {
    const {
        project,
    } = req.query

    command('reference', {
        hostName: MOCK_ADDR || getTestUrlByTask({
            project: String(project),
        }),
        project,
        testId: '',
        selectedScenariosLabels: req.body
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

export default function (): Router {
    const referenceRouter = Router()

    referenceRouter.get('/', reference)
    referenceRouter.post('/select-scenarios', reference)
    return referenceRouter
};
