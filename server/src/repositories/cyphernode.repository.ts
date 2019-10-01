const CryptoJS = require('crypto-js')
const axios = require('axios')
const fs = require('fs')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

export class CyphernodeRepository {
  baseURL: string
  h64: string
  api_id: string
  api_key: string
  
  constructor(is_prod: boolean = false) {
    const ENV = JSON.parse(fs.readFileSync('.env', 'utf8'))
  
    this.baseURL = is_prod ? 'https://cyphernode:443' : ENV.cypherApi
  
    // h64=$(echo -n "{"alg":"HS256","typ":"JWT"}" | base64)
    this.h64 = ENV.h64
    this.api_id = ENV.apiId
    this.api_key = ENV.apiKey
  }


  generateToken() {
    const current = Math.round(new Date().getTime()/1000) + 10
    const p = '{"id":"' + this.api_id + '","exp":' + current + '}'

    const p64 = Buffer.from(p).toString('base64')
    const msg = this.h64 + '.' + p64
    const s = CryptoJS.HmacSHA256(msg, this.api_key).toString()
    const token = msg + '.' + s

    // console.log("token", token)
    return token
  }

  post(url: string, postdata: object, addedOptions?: Array<string>) {
    const urlr = this.baseURL + url;
    const httpOptions = {
      data: postdata,
      npmRequestOptions: {
        strictSSL: false,
        agentOptions: {
          rejectUnauthorized: false
        }
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.generateToken()
      }
    }
    if (addedOptions) {
      Object.assign(httpOptions.npmRequestOptions, addedOptions)
    }

    return new Promise(resolve => {
      axios.post(urlr, httpOptions)
      .then(function (response: any) {
        // console.log('response', response.data)
        resolve(response.data)
      })
      .catch(function (error: object) {
        // console.log('error', error)
        resolve(error)
      })
    })
  }

  get(url: string, addedOptions?: object) {
    const urlr = this.baseURL + url
    const httpOptions = {
      npmRequestOptions: {
        strictSSL: false,
        agentOptions: {
          rejectUnauthorized: false
        }
      },
      headers: {
        'Authorization': 'Bearer ' + this.generateToken()
      }
    }
    if (addedOptions) {
      Object.assign(httpOptions.npmRequestOptions, addedOptions)
    }

    console.log('url', urlr)

    return new Promise(resolve => {
      axios.get(urlr, httpOptions)
      .then(function (response: any) {
        // console.log('response', response.data)
        resolve(response.data)
      })
      .catch(function (error: Array<string>) {
        // console.log('error', error)
        resolve(error)
      })
    })
  }

  watch(btcaddr: string, cb0conf: object, cb1conf: object) {
    // BODY {"address":"2N8DcqzfkYi8CkYzvNNS5amoq3SbAcQNXKp","unconfirmedCallbackURL":"192.168.122.233:1111/callback0conf","confirmedCallbackURL":"192.168.122.233:1111/callback1conf"}
    const data = { address: btcaddr, unconfirmedCallbackURL: cb0conf, confirmedCallbackURL: cb1conf }
    return this.post('/watch', data)
  }

  unwatch(btcaddr: string) {
    // 192.168.122.152:8080/unwatch/2N8DcqzfkYi8CkYzvNNS5amoq3SbAcQNXKp
    return this.get('/unwatch/' + btcaddr)
  }

  getActiveWatches() {
    // 192.168.122.152:8080/getactivewatches
    return this.get('/getactivewatches')
  }

  getTransaction(txid: string) {
    // http://192.168.122.152:8080/gettransaction/af867c86000da76df7ddb1054b273ca9e034e8c89d049b5b2795f9f590f67648
    return this.get('/gettransaction/' + txid)
  }

  getMempoolinfo() {
    // http://192.168.122.152:8080/getmempoolinfo
    return this.get('/getmempoolinfo')
  }

  spend(btcaddr: string, amount: number) {
    // BODY {"address":"2N8DcqzfkYi8CkYzvNNS5amoq3SbAcQNXKp","amount":0.00233}
    const data = { address: btcaddr, amount: amount }
    return this.post('/spend', data)
  }

  getBalance() {
    // http://192.168.122.152:8080/getbalance
    return this.get('/getbalance')
  }

  getNewAddress() {
    // http://192.168.122.152:8080/getnewaddress
    return this.get('/getnewaddress')
  }

  ots_stamp(hash: string, callbackUrl: any) {
    // POST https://cyphernode/ots_stamp
    // BODY {"hash":"1ddfb769eb0b8876bc570e25580e6a53afcf973362ee1ee4b54a807da2e5eed7","callbackUrl":"192.168.111.233:1111/callbackUrl"}
    const data = { hash: hash, callbackUrl: callbackUrl }
    return this.post('/ots_stamp', data)
  }

  ots_getfile(hash: string) {
    // http://192.168.122.152:8080/ots_getfile/1ddfb769eb0b8876bc570e25580e6a53afcf973362ee1ee4b54a807da2e5eed7

    // encoding: null is for HTTP get to not convert the binary data to the default encoding
    return this.get('/ots_getfile/' + hash, { encoding: null })
  }
}
