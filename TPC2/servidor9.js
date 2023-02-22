var http = require('http')
var url= require('url')
var fs=require('fs')

var meuServidor=http.createServer(function(req,res){
    var pedido=url.parse(req.url,true).pathname
    var d=new Date().toISOString().substring(0,16)
    console.log(req.method+ " "+req.url+" "+d)
    fs.readFile('pag'+pedido.substring()+'.html',function(err,data){
        res.writeHead(200,{'Content-Type':'text/plan;charset=utf-8'});
        var pedido=url.parse(req.url,true).pathname
        if(err){
            res.write("Erro na leitura do ficheiro: "+err)
        }
        else {
            res.write(data)
        }

        res.end()
    })
    


})
meuServidor.listen(7778);
console.log("Servidor à escuta na porta 7778...")

/* 
Node.js -> Aguenta com muito mais clientes do que o php 
GET- pedir info 
POST- enviar info 
PUT- envia alteração info 
DELETE- apaga a informação do path 

Códigos de erro- 400, 403, 404, 500 
*/