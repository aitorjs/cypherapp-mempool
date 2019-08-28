'use strict'

const express = require('express')
// const bodyParser = require('body-parser')
const path = require('path')
const { CyphernodeClient } = require('./client')
const port = process.env.PORT || 3000

class Http {
    constructor () {
      const app = express()
      const cypherClient = new CyphernodeClient()
  
      // app.use(bodyParser.urlencoded({ extended: true }))
      // app.use(bodyParser.json())

      // static for webapp/client on /cypherapp_mempool/client
      app.use('/', express.static(path.join(__dirname, '/../../client/dist/')))
      
      app.get('/getMempoolinfo', async (req, res) => {
        // console.log('params', JSON.parse(req.body.sig))
        
        const mempoolinfo = await cypherClient.getMempoolinfo()
        console.log('mempoolinfo', mempoolinfo)
        res.json(mempoolinfo)
      })
  
      app.listen(port, () => {
        console.log('HTTP Server listening on http://localhost:3000')
      })
    }
  }

  module.exports.Http = Http
