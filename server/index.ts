import express, { NextFunction, Request, Response } from 'express'

import path from 'path'
import fs from 'fs'

import apiRouter from './routes/api'

const app = express()
const port = 3000

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Cache-Control', 'private')
  next()
})

app.use(express.json())
app.use('/api', apiRouter())

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

app.get('/report', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, './assets/index.html'))
})

app.use(express.static('../app/dist'))

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../app/dist/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
