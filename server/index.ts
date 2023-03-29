import express, { Request, Response } from 'express'

import path from 'path'
import fs from 'fs'

import startRoute, { HOST_CONFIG } from './routes/start'

const testList = require('./routes/api/test-list.ts')

const app = express()
const port = 3000
const command = require('./backstop')

app.get('/api/test-list', testList)

app.get('/config.js', (req: Request, res: Response) => {
  const referrer = new URL(String(req.headers.referer))

  fs.readFile(path.join(
    __dirname,
    `./backstop/test/${referrer.searchParams.get('project')}`,
    String(referrer.searchParams.get('test')),
    'report.json',
  ), { encoding: 'utf8' }, (err: any, file: string) => {
    // string = string.replace(/\.\./bitmaps_reference/, "");
    res.setHeader('Content-Type', 'application/javascript')
    res.send(`report(${file})`)
  })
})

app.use('/assets', express.static('./assets'))
app.use('/test', express.static('./backstop/test'))
app.use('/reference', express.static('./backstop/reference'))

app.use(express.json())

app.get('/report', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, './assets/index.html'))
})

app.get('/api/reference', (req: Request, res: Response) => {
  const {
    hostName,
    project,
  } = req.query

  command('reference', {
    hostName: hostName || HOST_CONFIG[String(project)],
    project,
  }).then(() => {
    console.log('complete')
  }).catch((err: Error) => {
    console.log(err)
    console.log('error')
  }).finally(() => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send('ok')
  })
})

app.get('/api/start', startRoute)

app.use(express.static('../app/dist'))

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../app/dist/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
