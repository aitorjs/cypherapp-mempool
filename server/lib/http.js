'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const { CyphernodeClient } = require('./client')
const port = process.env.PORT || 3000

class Http {
    constructor () {
      const app = express()
      const cypherClient = new CyphernodeClient()
  
      app.use(bodyParser.urlencoded({ extended: true }))
      app.use(bodyParser.json())
      
      app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Methods', 'GET', 'POST')
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type')
        next()
      })
  
      app.get('/getMempoolinfo', async function (req, res) {
        // console.log('params', JSON.parse(req.body.sig))
        
        const mempoolinfo = await cypherClient.getMempoolinfo()
        console.log('mempoolinfo', mempoolinfo)
        res.json(mempoolinfo)
      })
  
      app.listen(port, function () {
        console.log('HTTP Server listening on http://localhost:3000')
      })
    }
  }

  module.exports.Http = Http
