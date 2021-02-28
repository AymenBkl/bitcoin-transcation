const express = require("express");
const router = express.Router();
const bitcore = require('bitcore-lib');
var Insight = require('bitcore-insight').Insight;


router.get('/genprivatekey', (req, res, next) => {
    let insight = new Insight('testnet');
    const privateKey = new bitcore.PrivateKey();
    console.log(privateKey.toAddress());
})

router.get('/genprivatekeysha256', (req, res, next) => {
    let value = Buffer.from('cat horse shoe lightning awesome bitcoin');
    let hash = bitcore.crypto.Hash.sha256(value);
    let bn = bitcore.crypto.BN.fromBuffer(hash);
    const privateKey = new bitcore.PrivateKey(bn);
    console.log(privateKey);
    const address = privateKey.toAddress();
    console.log(address.hashBuffer.toString());
})

router.get('/genprivatekeywif', (req, res, next) => {
    let insight = new Insight('testnet');
    const wif = 'cQ4tueVFAueyXsS7DhQfU1bhP35NKaGmA9EYWufNthD1XCDXhddy';
    const privateKey = new bitcore.PrivateKey(wif);
    const address = privateKey.toAddress();
    insight.address(address,(err, address) => {
        if (err) {
            console.log(err);
          // Handle errors...
        } else {
            console.log(address)
          return address;
        }
      })
})

router.get('/genprivatekey1', (req, res, next) => {
    const rand_buffer = bitcore.crypto.Random.getRandomBuffer(32);
    const rand_number = bitcore.crypto.BN.fromBuffer(rand_buffer);
    const address = new bitcore.PrivateKey('testnet').toWIF();
    console.log(address);
})



module.exports = router;