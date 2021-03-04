const express = require("express");
const router = express.Router();
var request = require("request");

const dotenv = require("dotenv");
dotenv.config();

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const headers = {
  "content-type": "text/plain;"
};

router.get("/test", (req, res) => res.json({ msg: "backend works" }));

router.get("/getblockcount", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  getInfo(res,dataString);
});

router.get("/getbestblockhash", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  getInfo(res,dataString);
});

router.get("/getconnectioncount", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  getInfo(res,dataString);
});

router.get("/getdifficulty", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  getInfo(res,dataString);
});

router.get("/getblockchaininfo", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  getInfo(res,dataString);
});

router.get("/getmininginfo", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  getInfo(res,dataString);
});

router.get("/getaccountaddress", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  getInfo(res,dataString);
});
router.get("/getpeerinfo", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  getInfo(res,dataString);
});

router.get("/getrawmempool", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  getInfo(res,dataString);
});

router.get("/getnewaddress", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":["-addresstype legacy"]}`;
  getInfo(res,dataString);
});

router.get("/walletlock", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  getInfo(res,dataString);
});

router.get("/getbalance", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[]}`;
  getInfo(res,dataString);
});

router.post("/sendtoaddress", (req, res) => {
  const url = req.url.split('/')[1];
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":{"address":"${req.body.address}","amount":${req.body.amount},"fee_rate":${req.body.fee}}}`;
  callback = (error, response, body) => {
    console.log(error);
    if (error || response.statusCode != 200){
      console.log('here')
      res.json({err:"Something Went Wrong",method:url,status:response.statusCode,message:JSON.parse(body)})
    }
    if (!error && response.statusCode == 200) {
      console.log('here2')
      const data = JSON.parse(body);
      console.log(data.result);
      res.json({data:data});
    }
  };
  prepareRequest(res,dataString,callback);
});

router.post("/listunspent", (req, res) => {
  let addresses = [];
  req.body.addresses.map(address => {
    addresses.push('"' + address + '"');
  })
  const url = req.url.split('/')[1];
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":[${req.body.minconf},${req.body.maxconf},[${addresses}]]}`;
  callback = (error, response, body) => {
    if (error || response.statusCode != 200){
      console.log('here')
      res.json({err:"Something Went Wrong",method:url,status:response.statusCode,message:JSON.parse(body)})
    }
    if (!error && response.statusCode == 200) {
      console.log('here2')
      const data = JSON.parse(body);
      console.log(data.result);
      res.json({data:data});
    }
  };
  prepareRequest(res,dataString,callback);
});

router.get("/walletpassphrase", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":["${PASS + " 3600"}"]}`;
  getInfo(res,dataString);
});

router.get("/dumpprivkey/:address", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":["${req.params.address}"]}`;
  getInfo(res,dataString);
});

router.get("/getblock/:hash", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.hash}]}`;
  getInfo(res,dataString);
});

router.get("/getblockhash/:index", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.index}]}`;
  getInfo(res,dataString);
});

router.get("/getrawtransaction/:id", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.id}]}`;
  getInfo(res,dataString);
});

router.get("/decoderawtransaction/:hex", (req, res) => {
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${req.url.split('/')[1]}","params":[${req.params.hex.toString()}]}`;
  getInfo(res,dataString);
});

function prepareRequest(res,dataString,callback){
  console.log(dataString);
  var options = {
    url: `http://167.99.213.37:80/wallet/bitexplodetest3`,
    method: "POST",
    headers: headers,
    auth:{
      user:USER,
      pass:PASS,
      sendImmediately:false
    },
    body: dataString
  };
  request(options, callback);
}

function getInfo(res,dataString){
  console.log(dataString);
  var options = {
    url: `http://167.99.213.37:80/wallet/bitexplode-test1`,
    method: "POST",
    headers: headers,
    auth:{
      user:USER,
      pass:PASS,
      sendImmediately:false
    },
    body: dataString
  };

  callback = (error, response, body) => {
    console.log("err",error);
    console.log('response',response.statusCode);
    console.log('body',body);
    if (error || response.statusCode != 200){
      console.log('here')
      res.json({err:"Something Went Wrong",method:url,status:response.statusCode,message:JSON.parse(body)})
    }
    if (!error && response.statusCode == 200) {
      console.log('here2')
      const data = JSON.parse(body);
      console.log(data.result);
      res.json({data:data});
    }
  };
  request(options, callback);
}


module.exports = router;
