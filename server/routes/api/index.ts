import express, { Router } from "express";
import startRoute from './start'
import testList from './test-list'
import reference from './reference'

export default function apiRouter(): Router {
    const apiRouter = express.Router();

    apiRouter.get('/start', startRoute)
    apiRouter.get('/test-list', testList)
    apiRouter.get('/reference', reference)

    return apiRouter
}