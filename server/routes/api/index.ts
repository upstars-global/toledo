import { Router } from "express";
import startRoute from './start'
import testList from './test-list'
import reference from './reference'
import deleteRoute from './delete'
import appList from './app-list'
import spaseUsage from './spaseUsage'
import {getScenariosProject} from "./test-scenarios";


export default function apiRouter(): Router {
    const apiRouter = Router();

    apiRouter.use('/start', startRoute())
    apiRouter.get('/test-list', testList)
    apiRouter.get('/app-list', appList)
    apiRouter.use('/reference', reference)
    apiRouter.get('/delete', deleteRoute)
    apiRouter.get('/spase-usage', spaseUsage)
    apiRouter.get('/test-scenarios', getScenariosProject)

    return apiRouter
}
