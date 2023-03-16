var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')
var User = require('../controllers/user')

/* GET User Form */
router.get('/users/register', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.list()
    .then(tasks => {
      res.render('mainPage', {u:null, taskList: tasks});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do formulário de registo do user"})
    })
});

module.exports = router;