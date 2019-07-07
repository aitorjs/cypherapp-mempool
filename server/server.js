'use strict'
const { Http } = require('./lib/http')

/* async function main() {
  const { address } = await cypherClient.getNewAddress()
  console.log('address', address)
  const { balance } = await cypherClient.getBalance()
  console.log('balance', balance)

  const mempoolinfo = await cypherClient.getMempoolinfo()
  console.log('mempoolinfo', mempoolinfo)
}

main() */

new Http()
