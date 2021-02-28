const express = require("express");
const router = express.Router();
const bitcore = require('bitcore-lib');
const Insight = require('bitcore-insight').Insight;

let insight = new Insight('testnet');

router.get('/genprivatekey', (req, res, next) => {
    const privateKey = new bitcore.PrivateKey();
    console.log(privateKey);
    console.log(privateKey.toAddress());
})

router.get('/genprivatekeysha256', (req, res, next) => {
    let value = Buffer.from('cat horse shoe lightning awesome bitcoin');
    let hash = bitcore.crypto.Hash.sha256(value);
    let bn = bitcore.crypto.BN.fromBuffer(hash);
    const privateKey = new bitcore.PrivateKey(bn);
    console.log(privateKey);
    console.log(privateKey.toAddress());
})

router.get('/genprivatekeywif', (req, res, next) => {
    const wif = 'xBtatQED9H44gCmp6HAdmemAzU3n84H3dGkuWTKvE23JgHMW8gct';
    const privateKey = new bitcore.PrivateKey(wif);
    console.log(privateKey);
    console.log(privateKey.toAddress());
})


module.exports = router;