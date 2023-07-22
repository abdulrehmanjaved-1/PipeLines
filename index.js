const express = require('express')
const stream = require('node:stream');
const status=require("express-status-monitor");
const fs=require("fs")
const os=require("os");
const cluster=require("cluster");
//defining th capacity of my cpu by os module 

const cpus = os.cpus().length;
if (cluster.isPrimary) {
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
}else{
const app = express()
const port = 1000;

app.use(status());
app.get('/',(req,res)=>{
  const stream=fs.createReadStream('./test.txt','utf-8');
  stream.on("data",(chunk)=>{
      res.write(chunk)
  })
  stream.on("end",()=>res.end())
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
}

