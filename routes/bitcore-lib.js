const express = require("express");
const router = express.Router();
var Insight = require('bitcore-insight').Insight;
var bitcore = require('bitcore-lib')
const base58 = require('base58');
let insight = new Insight('testnet');

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
    const myAdress = 'mpKdzhfbrCgEyUPSRPny7F3H5ANg457Yp7';
    insight.getUtxos(myAdress, (err, utxos) => {
        if(err){ 
          console.log('err',err);
          return err;
        }else { 
            console.log('utxos',utxos);
            // use the UTXOs to create transaction with bitcore Transaction object
            /**let tx = bitcore.Transaction();
            tx.from(utxos);
            tx.to(addressTo, amount);
            tx.change(myAddress);
            tx.fee(fee);
            tx.sign(privateKey);
            tx.serialize();
            
            // Broadcast your transaction to the Bitcoin network
            insight.broadcast(tx.toString(), (error, txid) => {
                if (error) {
                    return error;
                } else {
                  // Your Transaction Id
                    console.log(txid)
                }
            })**/
        }
    });
})



module.exports = router;