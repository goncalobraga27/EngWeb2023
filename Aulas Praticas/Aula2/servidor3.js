var http = require('http')
var meta= require('./aux')

http.createServer(function(req,res){
    console.log(req.method)
    console.log(req.url)
    res.writeHead(200,{'Content-Type':'text/plan;charset=utf-8'});
    res.write("<p style='Color:red'> Criada com o node.js por " +
    meta.myName()+" em "+meta.myDateTime()+ " na turma "+meta.turma)
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