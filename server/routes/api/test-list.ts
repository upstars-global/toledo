import { Request, Response } from 'express'
import { getTestResult } from '../../helpers/getTestResult'
import path from 'path'

const fs = require('fs')

export default function testList(req: Request, res: Response) {
  const projectPath = path.join(__dirname, `../../backstop/test/${req.query.project}`);
  fs.readdir(projectPath, null, (err: Error, files: string[]) => {
    if (err) {
      throw err
    }

    const index = files.indexOf('.gitkeep')
    files.splice(index, 1)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json')
    res.send(files.map((test) => {
      return {
        name: test,
        result: getTestResult(path.join(projectPath, test))
      }
    }))
  })
}
