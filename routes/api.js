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
  getInfo(res,req.url.substring(1));
});

router.get("/getbestblockhash", (req, res) => {
  getInfo(res,req.url.substring(1));
});

router.get("/getconnectioncount", (req, res) => {
  getInfo(res,req.url.substring(1));
});

router.get("/getdifficulty", (req, res) => {
  getInfo(res,req.url.substring(1));
});

router.get("/getblockchaininfo", (req, res) => {
  getInfo(res,req.url.substring(1));
});

router.get("/getmininginfo", (req, res) => {
  getInfo(res,req.url.substring(1));
});

router.get("/getpeerinfo", (req, res) => {
  getInfo(res,req.url.substring(1));
});

router.get("/getrawmempool", (req, res) => {
  getInfo(res,req.url.substring(1));
});

router.get("/getblock/:hash", (req, res) => {
  getInfo(res,req.url.substring(1));
});

router.get("/getblockhash/:index", (req, res) => {
  getInfo(res,req.url.substring(1));
});

router.get("/getrawtransaction/:id", (req, res) => {
  getInfo(res,req.url.substring(1));
});

router.get("/decoderawtransaction/:hex", (req, res) => {
  getInfo(res,req.url.substring(1));
});

function getInfo(res,url){
  console.log(url)
  var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${url}","params":[]}`;
  var options = {
    url: `http://127.0.0.1:8332/`,
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
    if (!error && response.statusCode == 200) {
      const data = JSON.parse(body);
      res.send(data);
    }
  };
  request(options, callback);
}
module.exports = router;
