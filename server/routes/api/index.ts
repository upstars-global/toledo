import express, { Router } from 'express';
import startRoute from './start';
import testList from './test-list';
import reference from './reference';
import deleteRoute from './delete';
import appList from './app-list';
import spaseUsage from './spaseUsage';
import { getScenariosProject } from './test-scenarios';


export default function apiRouter(): Router {
    const router = express.Router();

    router.get('/start', startRoute);
    router.post('/start-test-select-scenarios', startRoute);
    router.get('/test-list', testList);
    router.get('/app-list', appList);
    router.get('/reference', reference);
    router.post('/reference-select-scenarios', reference);
    router.get('/delete', deleteRoute);
    router.get('/spase-usage', spaseUsage);
    router.get('/test-scenarios', getScenariosProject);

    return router;
}
