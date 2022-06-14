const express = require('express')

const app = express()
const port = 3000

const path = require('path')

const fs = require('fs')
const command = require('./backstop/index')

app.get('/api/test-list', (req, res) => {
  const tests = []
  fs.readdir(path.join(__dirname, `./backstop/test/${req.query.project}`), null, (err, files) => {
    if (err) {
      throw err
    }

    const index = files.indexOf('.gitkeep')
    files.splice(index, 1)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Content-Type', 'application/json')
    res.send(files)
  })
})

app.get('/config.js', (req, res) => {
  const referrer = new URL(req.headers.referer)

  fs.readFile(path.join(
    __dirname,
    `./backstop/test/${referrer.searchParams.get('project')}`,
    referrer.searchParams.get('test'),
    'report.json',
  ), { encoding: 'utf8' }, (err, string) => {
    // string = string.replace(/\.\./bitmaps_reference/, "");
    res.setHeader('Content-Type', 'application/javascript')
    res.send(`report(${string})`)
  })
})

app.use('/assets', express.static('./assets'))
app.use('/test', express.static('./backstop/test'))
app.use('/reference', express.static('./backstop/reference'))

app.use(express.json())

app.get('/report', (req, res) => {
  res.sendFile(path.join(__dirname, './assets/index.html'))
})

app.get('/api/reference', (req, res) => {
  command('reference', req.query).then(() => {
    console.log('complete')
  }).catch(err => {
    console.log(err)
    console.log('error')
  }).finally(() => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send('ok')
  })
})
app.get('/api/start', async (req, res) => {
  command('test', req.query).then(() => {
    console.log('complete')
  }).catch(err => {
    console.log(err)
    console.log('error')
  }).finally(() => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send('ok')
  })
})

app.use(express.static('../app/dist'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../app/dist/index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
