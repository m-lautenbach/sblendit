// noinspection ES6UnusedImports
import regeneratorRuntime from 'regenerator-runtime'
import fs from 'fs'
import { createServer } from 'http'
import path from 'path'
import React from 'react'
import express from 'express'
import { listen } from 'socket.io'
import lowdb from 'lowdb'
import GhStorage from 'lowdb-gh-adapter'
import { promisifyAll } from 'bluebird'

import render from './src/server/render'
import { create as createStore } from './src/server/store'
import requestToLocation from './src/server/requestToLocation'

(async function () {
  promisifyAll(fs)

  let config
  try {
    config = JSON.parse(await fs.readFileAsync(path.resolve(__dirname, '../data/config.json')))
  } catch (ex) {
    config = {
      'ghStorage': {
        'file': process.env.GH_STORAGE_FILE,
        'repo': process.env.GH_STORAGE_REPO,
        'user': process.env.GH_STORAGE_USER,
        'token': process.env.GH_STORAGE_TOKEN,
      },
    }
  }

  const db = await lowdb(new GhStorage(config.ghStorage))
  db.defaults({}).write()
  const port = process.env.PORT || 3000
  const app = express()
  const http = createServer(app)
  const io = listen(http)

  app.use('/static', express.static(__dirname + '/dist'))

  const store = createStore(await db.get('redux').value())

  let state = store.getState()
  await startPersisting()

  async function startPersisting() {
    const newState = store.getState()
    if (!state || newState !== state) {
      await db.set('redux', newState).write()
      state = newState
    }
    setTimeout(startPersisting, 2000)
  }

  app.get('*', async (request, response) => {
    if (request.path === '/favicon.ico') {
      return response.status(404).end()
    }
    if (request.path === '/sw.js') {
      return response.sendFile(path.resolve(__dirname, 'dist/sw.js'))
    }
    const template = await fs.readFileAsync(path.resolve(__dirname, 'dist/index.html'))
    store.dispatch({
      type: 'USER_NAVIGATION',
      payload: { newLocation: requestToLocation(request) },
    })
    response.send(render(template.toString(), store))
  })

  io.on('connection', socket => {
    console.log('a user connected')
    socket.on('actions', (actions, callback) => {
      actions.forEach(store.dispatch)
      callback(true)
    })
  })

  http.listen(port)
  console.log('server started on port ' + port)
})()
