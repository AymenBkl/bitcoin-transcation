const express = require("express");
const router = express.Router();
var bitcore = require('bitcore-lib');
var Insight = require('bitcore-insight').Insight;

router.get('/genprivatekey', (req, res, next) => {
    var shell = {}

    // Generate a new Bitcoin address
    var slug = 'AlwaysBCoding!BitcoinScreencast1'
    var hash = bitcore.crypto.Hash.sha256(new Buffer(slug))
    var bn = bitcore.crypto.BN.fromBuffer(hash)
    var pKey = bitcore.PrivateKey(bn)
    var addr = pKey.toAddress();
    console.log(addr)
})

router.get('/genprivatekeysha256', (req, res, next) => {
    var input = bitcore.crypto.Random.getRandomBuffer(32);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    //private key
    var pk = new bitcore.PrivateKey(bn);
    //public key
    var addy = pk.toAddress();
    console.log('private key : ' + pk + ' , Public key : ' + addy);
})

router.get('/genprivatekeywif', (req, res, next) => {
    var pk = new bitcore.PrivateKey()
    var WIF = pk.toWIF();
    var address = pk.toAddress('testnet');
    console.log('private key : ' + pk + ' , WIF key : ' + WIF + ' , Public key : ' + address);
})

router.get('/bitcointranscation', (req, res, next) => {
    var input = bitcore.crypto.Random.getRandomBuffer(32);
    var hash = bitcore.crypto.Hash.sha256(input);
    var bn = bitcore.crypto.BN.fromBuffer(hash);
    //private key
    var pk = new bitcore.PrivateKey(bn);
    //public key
    var addy = pk.toAddress();
    console.log('private key : ' + pk + ' , Public key : ' + addy);
    var insight = new Insight();
    const myAdress = 'mpKdzhfbrCgEyUPSRPny7F3H5ANg457Yp7';
    insight.address(addy, (error, result) => { console.log(error,result) })
    
})



module.exports = router;