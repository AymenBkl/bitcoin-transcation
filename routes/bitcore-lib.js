const express = require("express");
const router = express.Router();
const bitcore = require('bitcore-lib');
const Insight = require('bitcore-insight').Insight;

let insight = new Insight('testnet');

router.get('/genprivatekey', (req, res, next) => {
    const privateKey = new bitcore.PrivateKey();
    console.log(privateKey);
    console.log(privateKey.toAddress('testnet'));
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
    const wif = 'cQ4tueVFAueyXsS7DhQfU1bhP35NKaGmA9EYWufNthD1XCDXhddy';
    const privateKey = bitcore.PrivateKey.fromWIF(wif);
    const address = privateKey.toAddress();
    console.log(privateKey);
    console.log(address);
})

router.get('/genprivatekey1', (req, res, next) => {
    const rand_buffer = bitcore.crypto.Random.getRandomBuffer(32);
    const rand_number = bitcore.crypto.BN.fromBuffer(rand_buffer);
    const address = new bitcore.PrivateKey('testnet').toWIF();
    console.log(address);
})



module.exports = router;