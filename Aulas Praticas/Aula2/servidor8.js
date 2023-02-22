var http = require('http')
var meta= require('./aux')
var url= require('url')

var meuServidor=http.createServer(function(req,res){
    var d=new Date().toISOString().substring(0,16)
    console.log(req.method+ " "+req.url+" "+d)
    res.writeHead(200,{'Content-Type':'text/plan;charset=utf-8'});
    var pedido=url.parse(req.url,true).pathname
    if(pedido=='/add'){
        var operandos = url.parse(req.url,true).query 
        var r= parseInt(operandos.n1,10)+parseInt(operandos.n2,10)
        res.write("<p>A soma é "+ r +"</p>")
    }
    else if(pedido=="/sub"){
        var operandos = url.parse(req.url,true).query 
        var r= parseInt(operandos.n1,10)-parseInt(operandos.n2,10)
        res.write("<p>A subtração é "+ r +"</p>")
    }
    else {
        res.write("<p>Operação não suportada...</p>")
    
    }
    res.end()

})
meuServidor.listen(5555);
console.log("Servidor à escuta na porta 7777...")

/* 
Node.js -> Aguenta com muito mais clientes do que o php 
GET- pedir info 
POST- enviar info 
PUT- envia alteração info 
DELETE- apaga a informação do path 

Códigos de erro- 400, 403, 404, 500 
*/