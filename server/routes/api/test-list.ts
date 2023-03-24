import { Request, Response } from 'express'
import path from "path";
const fs = require('fs')

module.exports = function startRoute(req: Request, res: Response) {
    const tests = []
    fs.readdir(path.join(__dirname, `../../backstop/test/${req.query.project}`), null, (err: Error, files: string[]) => {
        if (err) {
            throw err
        }

        const index = files.indexOf('.gitkeep')
        files.splice(index, 1)
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'application/json')
        res.send(files)
    })
}
