var express = require('express');
var router = express.Router();

module.exports.addUser = u => {
  return axios.post('http://localhost:3000/users' ,u)
                .then(resposta => {
                    return resposta.data
                })
                .catch(erro => {
                    return erro
                })
}

module.exports = router;
