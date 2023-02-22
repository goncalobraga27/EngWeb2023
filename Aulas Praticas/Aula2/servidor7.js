var http = require('http')
var meta= require('./aux')
var url=require('url')

var meuServidor=http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plan;charset=utf-8'});
    var tudo=url.parse(req.url,true)
    res.write("True:<pre>"+JSON.stringify(tudo)+"</pre>")
    var q=url.parse(req.url,false).query
    res.write("True:<pre>"+JSON.stringify(q)+"</pre>")
    var qtext=url.parse(req.url,false).query
    res.write("False:<pre>"+JSON.stringify(qtext)+"</pre>")
    res.end()

})
meuServidor.listen(7777);
console.log("Servidor à escuta na porta 7777...")

/* 
Node.js -> Aguenta com muito mais clientes do que o php 
GET- pedir info 
POST- enviar info 
PUT- envia alteração info 
DELETE- apaga a informação do path 

Códigos de erro- 400, 403, 404, 500 
*/