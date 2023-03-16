var axios = require('axios')

// Para obter a lista de tasks
module.exports.list = () => {
    return axios.get('http://localhost:3000/tasks')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.getTask = id => {
    return axios.get('http://localhost:3000/tasks/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.addTask = t => {
    return axios.post('http://localhost:3000/tasks' ,t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.updateTask = t => {
    return axios.put('http://localhost:3000/tasks/' + t.id,t)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

module.exports.deleteTask = t => {
    return axios.delete('http://localhost:3000/tasks/' + t.id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}