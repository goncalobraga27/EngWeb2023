var http = require('http')
var meta= require('./aux')

http.createServer(function(req,res){
    var d=new Date().toISOString().substring(0,16)
    res.writeHead(200,{'Content-Type':'text/plan;charset=utf-8'});
    console.log(req.method+ " "+req.url+" "+d)
    res.write("<pre>"+req.method+ " "+req.url+" "+d+"</pre>")
    res.end()

}).listen(7777);

console.log("Servidor à escuta na porta 7777...")

/* 
Node.js -> Aguenta com muito mais clientes do que o php 
GET- pedir info 
POST- enviar info 
PUT- envia alteração info 
DELETE- apaga a informação do path 

Códigos de erro- 400, 403, 404, 500 
*/