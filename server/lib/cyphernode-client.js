//var createHmac = require('create-hmac')
const CryptoJS = require("crypto-js")
const HTTPS = require('https')
const fs = require('fs')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

CyphernodeClient = function(is_prod) {
  const ENV = JSON.parse(fs.readFileSync('.env', 'utf8'))
  
  this.baseURL = is_prod ? 'https://cyphernode:443' : ENV.cypherApi

  // h64=$(echo -n "{"alg":"HS256","typ":"JWT"}" | base64)
  this.h64 = ENV.h64
  this.api_id = ENV.apiId
  this.api_key = ENV.apiKey
};

// $h64.$p64.$s
CyphernodeClient.prototype._generateToken = function() {
  const current = Math.round(new Date().getTime()/1000) + 10
  const p = '{"id":"' + this.api_id + '","exp":' + current + '}'

  const p64 = Buffer.from(p).toString('base64')
  const msg = this.h64 + '.' + p64
  const s = CryptoJS.HmacSHA256(msg, this.api_key).toString()
  const token = msg + '.' + s
  
  // console.log("token", token)
  return token
}

CyphernodeClient.prototype._post = function(url, postdata, cb, addedOptions) {
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
      'Authorization': 'Bearer ' + this._generateToken()
    }
  }
  if (addedOptions) {
    Object.assign(httpOptions.npmRequestOptions, addedOptions)
  }

  HTTPS.post(urlr, httpOptions,
    function (err, resp) {
//      console.log(err)
//      console.log(resp)
      cb(err, resp.data || resp.content)
    }
  )
};

CyphernodeClient.prototype._get = function(url, cb, addedOptions) {
  const urlr = this.baseURL + url;
  const httpOptions = {
    npmRequestOptions: {
      strictSSL: false,
      agentOptions: {
        rejectUnauthorized: false
      }
    },
    headers: {
      'Authorization': 'Bearer ' + this._generateToken()
    }
  }
  if (addedOptions) {
    Object.assign(httpOptions.npmRequestOptions, addedOptions)
  }

  console.log('url', urlr)
  HTTPS.get(urlr, httpOptions, function (resp) {
    resp.on('data', chunk => {
      const res = JSON.parse(Buffer.from(chunk).toString())
      // console.log('data', res)
      cb(res)
    });


    resp.on('error', (err) => {
      console.log('Error: ', err.message);
      cb(err)
    });
    
    }
  )
};

CyphernodeClient.prototype.watch = function(btcaddr, cb0conf, cb1conf, cbreply) {
  // BODY {"address":"2N8DcqzfkYi8CkYzvNNS5amoq3SbAcQNXKp","unconfirmedCallbackURL":"192.168.122.233:1111/callback0conf","confirmedCallbackURL":"192.168.122.233:1111/callback1conf"}
  const data = { address: btcaddr, unconfirmedCallbackURL: cb0conf, confirmedCallbackURL: cb1conf }
  this._post('/watch', data, cbreply);
};

CyphernodeClient.prototype.unwatch = function(btcaddr, cbreply) {
  // 192.168.122.152:8080/unwatch/2N8DcqzfkYi8CkYzvNNS5amoq3SbAcQNXKp
  this._get('/unwatch/' + btcaddr, cbreply);
};

CyphernodeClient.prototype.getActiveWatches = function(cbreply) {
  // 192.168.122.152:8080/getactivewatches
  this._get('/getactivewatches', cbreply);
};

CyphernodeClient.prototype.getTransaction = function(txid, cbreply) {
  // http://192.168.122.152:8080/gettransaction/af867c86000da76df7ddb1054b273ca9e034e8c89d049b5b2795f9f590f67648
  this._get('/gettransaction/' + txid, cbreply);
};

CyphernodeClient.prototype.getMempoolinfo = function(cbreply) {
  // http://192.168.122.152:8080/getmempoolinfo
  this._get('/getmempoolinfo/', cbreply);
};

CyphernodeClient.prototype.spend = function(btcaddr, amnt, cbreply) {
  // BODY {"address":"2N8DcqzfkYi8CkYzvNNS5amoq3SbAcQNXKp","amount":0.00233}
  const data = { address: btcaddr, amount: amnt }
  this._post('/spend', data, cbreply);
};

CyphernodeClient.prototype.getBalance = function(cbreply) {
  // http://192.168.122.152:8080/getbalance
  this._get('/getbalance', cbreply);
};

CyphernodeClient.prototype.getNewAddress = function(cbreply) {
  // http://192.168.122.152:8080/getnewaddress
  this._get('/getnewaddress', cbreply);
};

CyphernodeClient.prototype.ots_stamp = function(hash, callbackUrl, cbreply) {
  // POST https://cyphernode/ots_stamp
  // BODY {"hash":"1ddfb769eb0b8876bc570e25580e6a53afcf973362ee1ee4b54a807da2e5eed7","callbackUrl":"192.168.111.233:1111/callbackUrl"}
  const data = { hash: hash, callbackUrl: callbackUrl }
  this._post('/ots_stamp', data, cbreply);
};

CyphernodeClient.prototype.ots_getfile = function(hash, cbreply) {
  // http://192.168.122.152:8080/ots_getfile/1ddfb769eb0b8876bc570e25580e6a53afcf973362ee1ee4b54a807da2e5eed7

  // encoding: null is for HTTP get to not convert the binary data to the default encoding
  this._get('/ots_getfile/' + hash, cbreply, { encoding: null });
};

module.exports = CyphernodeClient