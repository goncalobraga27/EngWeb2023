var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
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
                // GET /users --------------------------------------------------------------------
                if((req.url == "/users")){
                    axios.get("http://localhost:3000/users?_sort=nome")
                        .then(response => {
                            var users = response.data
                            // Render page with the users list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.usersTasksListPage(users,[], d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de users... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /users/add --------------------------------------------------------------------
                else if((req.url == "/users/add")){
                    axios.get("http://localhost:3000/users?id=BOT1")
                        .then(response => {
                            var u=response.data
                            // Render page with the users list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.userAddPage(u,d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de users... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /tasks --------------------------------------------------------------------
                else if((req.url == "/tasks")){
                    axios.get("http://localhost:3000/tasks")
                        .then(response => {
                            var tasks = response.data
                            // Render page with the users list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.usersTasksListPage([],tasks,d))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de users... Erro: " + erro)
                            res.end()
                        })
                }
                // GET /users/edit/id --------------------------------------------------------------------
                else if(/\/users\/edit\/[a-zA-Z0-9]+$/i.test(req.url)){
                    // get user record
                    var idUser = req.url.split("/")[3]
                    axios.get("http://localhost:3000/users/" + idUser)
                        .then( response => {
                            let u = response.data
                            // Add code to render page with the student record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.end(templates.userFormEditPage(u,d))
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(`<p>Não foi possível obter o registo do aluno${idUser}... Erro: ` + erro)
                            res.end()
                        })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                // POST /users/edit/id -------------------------------------------------------------
                if(/\/users\/edit\/[0-9A-Za-z]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/users/'+result.id,result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>Updated: '+JSON.stringify(result) +'</p>')
                                res.end()
                                }).catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to update user record...</p>")
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
                // POST /users/add -------------------------------------------------------------
                else if((req.url == "/users/add")){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.put('http://localhost:3000/users/'+result.id,result)
                            .then(resp => {
                                res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>Updated: '+JSON.stringify(result) +'</p>')
                                res.end()
                                }).catch(error => {
                                    console.log('Erro: ' + error);
                                    res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                                    res.write("<p>Unable to update user record...</p>")
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
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
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