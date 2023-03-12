var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
var fs = require('fs')
const { parse } = require('querystring');

// Aux function 
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

// Server criation
var server = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else {
        switch(req.method){
            case "GET":
                // GET /users/register -------------------------------------------------
                if(req.url == "/users/register"){
                    // Add code to render page with the student form
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    // res.write(studentFormPage(d))
                    res.end(templates.userPage(d))
                }
                // GET /tasks ----------------------------------------------------------
                if(req.url == "/tasks"){
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            // Render page with the student's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.mainPage(null,tasks,d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de alunos... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /tasks/edit/id --------------------------------------------------------------------
                else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    // get aluno record
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            let task = response.data
                            // Add code to render page with the student record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.tasksFormEditPage(task,d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Não foi possível obter o registo do aluno${idAluno}... Erro: ` + erro)
                            res.end()
                        })
                }
                // GET /tasks/done/id --------------------------------------------------------------------
                else if(/\/tasks\/done\/[0-9]+$/i.test(req.url)){
                    // get aluno record
                    var idTask = req.url.split("/")[3]
                    axios.get("http://localhost:3000/tasks/" + idTask)
                        .then( response => {
                            let task = response.data
                            // Add code to render page with the student record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.tasksDoneEditPage(task,d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Não foi possível obter o registo do aluno${idAluno}... Erro: ` + erro)
                            res.end()
                        })
                }
              break
            case "POST":
                if(req.url == '/users/register'){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(templates.userPage(d))
                    res.end()
                }
                // POST /tasks/edit/id ----------------------------------------------
                else if(/\/tasks\/edit\/[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/tasks/'+result.id,result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(templates.editTaskConfirmPage(d))
                                res.end()
                                }).catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to update student record...</p>")
                                    res.end()
                                })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                // POST /tasks/done/id ----------------------------------------------
                else if(/\/tasks\/done\/[0-9]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/tasks/'+result.id,result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(templates.doneTaskConfirmPage(d))
                                res.end()
                                }).catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to update student record...</p>")
                                    res.end()
                                })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                
                break
            default:
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }



})

server.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})