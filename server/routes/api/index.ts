import express, { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import startRoute from './start';
import testList from './test-list';
import reference from './reference';
import referenceList from './reference-list';
import deleteRoute from './delete';
import appList from './app-list';
import spaseUsage from './spaseUsage';
import { getScenariosProject } from './test-scenarios';

const referenceListLimiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 60,
    standardHeaders: true,
    legacyHeaders: false,
});

export default function apiRouter(): Router {
    const router = express.Router();

    router.get('/start', startRoute);
    router.post('/start-test-select-scenarios', startRoute);
    router.get('/test-list', testList);
    router.get('/app-list', appList);
    router.get('/reference', reference);
    router.get('/reference-list', referenceListLimiter, referenceList);
    router.post('/reference-select-scenarios', reference);
    router.get('/delete', deleteRoute);
    router.get('/spase-usage', spaseUsage);
    router.get('/test-scenarios', getScenariosProject);

    return router;
}
