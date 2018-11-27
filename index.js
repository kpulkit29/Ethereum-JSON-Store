var Web3 = require('web3');
var express=require("express");
var Tx = require('ethereumjs-tx');
var bodyParser=require("body-parser");
const cors=require("cors");
var app=express();
const abi=require("./utils/stats");
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static(__dirname+"/public"));
const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/dfaed9e96792434889482d3de7450c39'))

 
 // the destination address
 const addressTo = '0x08f29d188a88a05d15b787698acbd445f966da01'
 
 // Signs the given transaction data and sends it. Abstracts some of the details 
 // of buffering and serializing the transaction for web3.
 function sendSigned(txData,privKey, cb) {
   const privateKey = new Buffer(privKey, 'hex')
   const transaction = new Tx(txData)
   transaction.sign(privateKey)
   const serializedTx = transaction.serialize().toString('hex')
   web3.eth.sendSignedTransaction('0x' + serializedTx, cb)
 }

app.get("/",(req,res)=>{
    res.sendFile("index.html");
})
app.post("/store",(req,res)=>{
    web3.eth.getTransactionCount(req.body.addressFrom).then(txCount => {
    console.log(txCount);
      // construct the transaction data
      const txData = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(2500000),
        gasPrice: web3.utils.toHex(10e9), // 10 Gwei
        to: addressTo,
        from: req.body.addressFrom,
        value: web3.utils.toHex(web3.utils.toWei("0", 'ether')),
        data:JSON.stringify(req.body.urlRespose)
      }
    
      // fire away!
      sendSigned(txData,req.body.priv, function(err, result) {
        if (err) return console.log('error', err)
        console.log('sent', result)
        res.send(JSON.stringify(result));
      })
    
})
});

app.get("/data",(req,res)=>{
    var contract=new web3.eth.Contract(abi,addressTo);
    contract.methods.getVal().call(function(err,result){
        res.send(result);
    })
})
app.listen("3000");