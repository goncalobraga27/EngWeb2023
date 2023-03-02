var http=require('http')
var axios=require('axios')
var mypages=require('./mypages')
var fs = require('fs')

function searchFeminino(pessoas){
    const mulheres=[];
    for(let i = 0;i < pessoas.length;i++){
        if (pessoas[i].sexo =='feminino'){
            mulheres.push(pessoas[i])
        }
    }
    return mulheres;

}
function searchMasculino(pessoas){
    const mulheres=[];
    for(let i = 0;i < pessoas.length;i++){
        if (pessoas[i].sexo =='masculino'){
            mulheres.push(pessoas[i])
        }
    }
    return mulheres;

}
function searchDesportos(pessoas){
    const desportos = new Map()
    for(let i = 0;i < pessoas.length;i++){
        const pessoa=pessoas[i];
        for(let k = 0;k < pessoa.desportos.length;k++){
            if (desportos.has(pessoa.desportos[k])){
                const listaPessoas=desportos.get(pessoa.desportos[k]);
                listaPessoas.push(pessoa);
                desportos.set(pessoa.desportos[k],listaPessoas);
            }
            else {
                const listaPessoas=[pessoa]
                desportos.set(pessoa.desportos[k],listaPessoas);
            }
        }
    }
    return desportos;

}
var meuServidor=http.createServer(function(req,res){
    var d=new Date().toISOString().substring(0,16)
    console.log(req.method+ " "+req.url+" "+d)
    if (req.url=="/pessoas"){
        axios.get('http://localhost:3000/pessoas?_sort=nome&_order=asc')
        .then(function(resp){
            var pessoas = resp.data
            console.log("Recuperei "+pessoas.length + " registos")
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end(mypages.genMainPage(pessoas,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end("<p>ERRO:  "+ erro+" </p>")
        })
    }
    else if (req.url=="/ordDesc"){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            let pessoasOrdenadas = pessoas.sort(
                (p1,p2)=>(p1.nome<p2.nome) ? 1 : -1 
            )

            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end(mypages.genMainPage(pessoasOrdenadas,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end("<p>ERRO:  "+ erro+" </p>")
        })

    }
    else if(req.url.match(/p\d+/)){ // expressão regular 
        axios.get('http://localhost:3000/pessoas/'+req.url.substring(9))
        .then(function(resp){
            var pessoa = resp.data
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end(mypages.pessoaPage(pessoa,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end("<p>ERRO:  "+ erro+" </p>")
        })
    }
    else if (req.url == "/w3.css"){
        fs.readFile('w3.css',function(err,data){
            res.writeHead(200,{'Content-Type':'text/css'});
            if(err){
                res.write("Erro na leitura do ficheiro: "+err)
            }
            else {
                res.write(data)
            }

            res.end()
        })
    }
    else if (req.url == "/sexo"){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            let sexoFeminino = searchFeminino(pessoas)
            let sexoMasculino = searchMasculino(pessoas)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end(mypages.genSexoPage(sexoFeminino,sexoMasculino,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end("<p>ERRO:  "+ erro+" </p>")
        })
    }else if (req.url == "/desportos"){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            let desportistas = searchDesportos(pessoas)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end(mypages.genDesportoPage(desportistas,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end("<p>ERRO:  "+ erro+" </p>")
        })
    }
    else{
        res.writeHead(404,{'Content-Type':'text/html;charset=utf-8'})
        res.end("<p>ERRO:  "+ "Operação não suportada"+" </p>")
    }


})
meuServidor.listen(7777);
console.log("Servidor à escuta na porta 7777...")

