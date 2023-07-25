import express, { Router } from "express";
import startRoute from './start'
import testList from './test-list'
import reference from './reference'
import deleteRoute from './delete'

export default function apiRouter(): Router {
    const apiRouter = express.Router();

    apiRouter.get('/start', startRoute)
    apiRouter.get('/test-list', testList)
    apiRouter.get('/reference', reference)
    apiRouter.get('/delete', deleteRoute)

    return apiRouter
}