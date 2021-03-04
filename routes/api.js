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
  getInfo(res,req.url.split('/')[1]);
});

router.get("/getbestblockhash", (req, res) => {
  getInfo(res,req.url.split('/')[1]);
});

router.get("/getconnectioncount", (req, res) => {
  getInfo(res,req.url.split('/')[1]);
});

router.get("/getdifficulty", (req, res) => {
  getInfo(res,req.url.split('/')[1]);
});

router.get("/getblockchaininfo", (req, res) => {
  getInfo(res,req.url.split('/')[1]);
});

router.get("/getmininginfo", (req, res) => {
  getInfo(res,req.url.split('/')[1]);
});

router.get("/getaccountaddress", (req, res) => {
  getInfo(res,req.url.split('/')[1]);
});
router.get("/getpeerinfo", (req, res) => {
  getInfo(res,req.url.split('/')[1]);
});

router.get("/getrawmempool", (req, res) => {
  getInfo(res,req.url.split('/')[1]);
});

router.get("/getnewaddress", (req, res) => {
  wallet(res,req.url.split('/')[1],"-addresstype legacy" );
});

router.get("/walletlock", (req, res) => {
  getInfo(res,req.url.split('/')[1]);
});

router.get("/getbalance", (req, res) => {
  getInfo(res,req.url.split('/')[1]);
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
  const url = req.url.split('/')[1];
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":[${req.body.minconf},${req.body.maxconf},["${req.body.addresses}"]]}`;
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

router.get("/walletpassphrase", (req, res) => {
  wallet(res,req.url.split('/')[1],PASS + " 3600");
});

router.get("/dumpprivkey/:address", (req, res) => {
  wallet(res,req.url.split('/')[1],req.params.address);
});

router.get("/getblock/:hash", (req, res) => {
  getInfo(res,req.url.split('/')[1],req.params.hash);
});

router.get("/getblockhash/:index", (req, res) => {
  getInfo(res,req.url.split('/')[1],req.params.index);
});

router.get("/getrawtransaction/:id", (req, res) => {
  getInfo(res,req.url.split('/')[1],req.params.id);
});

router.get("/decoderawtransaction/:hex", (req, res) => {
  getInfo(res,req.url.split('/')[1],req.params.hex.toString());
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

function getInfo(res,url,params = ''){
  console.log(url)
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":["${params}"]}`;
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
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      console.log(data);
      return data;
    }
  };
  request(options, callback);
}

function wallet(res,url,params = ''){
  console.log(url)
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":["${params}"]}`;
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
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
    }
  };
  request(options, callback);
}
module.exports = router;
