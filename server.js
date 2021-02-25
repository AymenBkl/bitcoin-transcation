const express = require("express");
const bodyParser = require("body-parser");
const rpcMethods = require("./routes/api");
var request = require("request");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", rpcMethods);

const USER = process.env.RPC_USER;
const PASS = process.env.RPC_PASSWORD;

const headers = {
  "content-type": "text/plain;"
};
const port = process.env.PORT || 4444;

getblockCount();

server = app.listen(port, () => console.log(`Server running on port ${port}`));


function getblockCount(){
    var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"getblockcount","params":[]}`;
  var options = {
    url: `http://${USER}:${PASS}@127.0.0.1:8333/`,
    method: "POST",
    headers: headers,
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
