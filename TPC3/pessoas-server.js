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
function searchProfissoes(pessoas){
    const profissoes = new Map()
    for(let i = 0;i < pessoas.length;i++){
        const pessoa=pessoas[i];
        if (profissoes.has(pessoa.profissao)){
            const listaPessoas=profissoes.get(pessoa.profissao);
            listaPessoas.push(pessoa);
            profissoes.set(pessoa.profissao,listaPessoas);
        }
        else {
            const listaPessoas=[pessoa]
            profissoes.set(pessoa.profissao,listaPessoas);
        }
    
    }
    return profissoes;
}
function searchPessoasWithProf(pessoas,profFirst,profSecond){
    const pessoasProf=[]
    for (let i = 0;i<pessoas.length;i++){
        if (pessoas[i].profissao.slice(0,3)==profFirst && pessoas[i].profissao.slice(pessoas[i].profissao.length-3,pessoas[i].profissao.length-1)==profSecond){
            pessoasProf.push(pessoas[i])
        }
    }
    return pessoasProf;
}
function searchPessoasWithDesp(pessoas,despFirst,despSecond){
    const pessoasDesp=[]
    for (let i = 0;i<pessoas.length;i++){
        for (let k=0;k<pessoas[i].desportos.length;k++){
            if (pessoas[i].desportos[k][0]==despFirst && pessoas[i].desportos[k].slice(pessoas[i].desportos[k].length-4,pessoas[i].desportos[k].length-2)==despSecond){
                pessoasDesp.push(pessoas[i])
            }
        }
    }
    return pessoasDesp;
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
    else if (req.url == "/sexo/w3.css"){
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
            res.end(mypages.genSexoPage(sexoFeminino.length,sexoMasculino.length,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end("<p>ERRO:  "+ erro+" </p>")
        })
    }
    else if (req.url =="/sexo/masculino"){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            let sexoMasculino = searchMasculino(pessoas)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end(mypages.genHomensPage(sexoMasculino,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end("<p>ERRO:  "+ erro+" </p>")
        })
    }
    else if (req.url =="/sexo/feminino"){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            let sexoFeminino = searchFeminino(pessoas)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end(mypages.genMulheresPage(sexoFeminino,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end("<p>ERRO:  "+ erro+" </p>")
        })
    }
    else if (req.url == "/desportos"){
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
    else if (req.url == "/desportos/w3.css"){
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
    else if(req.url.match(/desportos\/[a-zA-Z0-9\s\ç\ó\é\á\ã\á\-\í\â]+/)){
        desp=req.url.substring(11)
        despFirst=desp[0]
        despSecond=desp.slice((desp.length)-4,(desp.length)-2)
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoasDesportistas = resp.data
            let pessoasDesp=searchPessoasWithDesp(pessoasDesportistas,despFirst,despSecond)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end(mypages.pessoasDespPage(pessoasDesp,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end("<p>ERRO:  "+ erro+" </p>")
        })
    }
    else if (req.url == "/profissao"){
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoas = resp.data
            let profissoes = searchProfissoes(pessoas)
            const profissoesSorted = new Map([...profissoes.entries()].sort((a, b) => b[1].length - a[1].length));
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end(mypages.genProfissaoPage(profissoesSorted,d))
        })
        .catch(erro => {
            console.log("Erro: "+ erro)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end("<p>ERRO:  "+ erro+" </p>")
        })
    }
    else if (req.url == "/profissao/w3.css"){
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
    else if(req.url.match(/profissao\/\w+/)){ // expressão regular 
        prof=req.url.substring(11)
        profFirst=prof.slice(0,3)
        profSecond=prof.slice((prof.length)-3,(prof.length)-1)
        axios.get('http://localhost:3000/pessoas')
        .then(function(resp){
            var pessoasComTrabalho = resp.data
            let pessoasProf=searchPessoasWithProf(pessoasComTrabalho,profFirst,profSecond)
            res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
            res.end(mypages.pessoasPage(pessoasProf,d))
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

