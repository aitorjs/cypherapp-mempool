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
  
      /* const cors = (req, res, next) => {
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000') 
        res.header('Access-Control-Allow-Methods', 'GET', 'POST')
        // res.header('Access-Control-Allow-Headers', 'Origin, Content-Type')
        next()
      } */

      // app.use(bodyParser.urlencoded({ extended: true }))
      // app.use(bodyParser.json())
      
      // app.use(cors)
      
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
