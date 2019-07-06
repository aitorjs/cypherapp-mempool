const CyphernodeClient = require('./lib/cyphernode-client')
const cypherClient = new CyphernodeClient()

cypherClient.getNewAddress(res => {
  console.log('address', res.address)
  cypherClient.getBalance(res => {
    console.log('balance', res.balance)
  })
})

cypherClient.getMempoolinfo(res => {
  console.log('mempool', res, res.size)
})