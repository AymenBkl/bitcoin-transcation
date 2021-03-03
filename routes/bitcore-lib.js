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

router.get('/bitcoinjs', (req, res, next) => {
    const bitcoin = require('bitcoinjs-lib');
    let testnet = bitcoin.networks.testnet;
    let keypair = bitcoin.ECPair.makeRandom({network:testnet});
    let payment = bitcoin.payments.p2pkh({
        pubkey:keypair.publicKey,
        network:testnet
    });
    //mkiJSzDEGvsJJ7Rma6HV718roQ5Rj2jH9P cRLVb8zKie7ULxtd4RKEpXAHmjB9NtTrQnvyu7qRXFHqwcjWZn1y
    console.log(payment.address, ' ' ,keypair.toWIF());

    let txb = new bitcoin.TransactionBuilder(testnet);
    let txid = '173e17bf1590de797c6b3770fdc40ee7005688476badc5af471013ab99dd6350';
    let outn = 0;
    txb.addInput(txid,outn);
    txb.addOutput('mkiJSzDEGvsJJ7Rma6HV718roQ5Rj2jH9P',20);
    let WIF = 'cRLVb8zKie7ULxtd4RKEpXAHmjB9NtTrQnvyu7qRXFHqwcjWZn1y';
    let keypairspend = bitcoin.ECPair.fromWIF(WIF,testnet);
    txb.sign(0,keypairspend);
    let tx = txb.build();
    let txhex = tx.toHex();
    console.log(txhex);




    
})


module.exports = router;