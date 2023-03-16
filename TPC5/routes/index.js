var express = require('express');
var router = express.Router();
var Task = require('../controllers/task')
var User = require('../controllers/user')

/* GET /users/register */
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
/* GET /tasks/register */
router.get('/tasks/register', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.list()
    .then(tasks => {
      res.render('mainPage', {u:null, taskList: tasks});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do formulário de registo da task"})
    })
});
/* GET /tasks */
router.get('/tasks', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.list()
    .then(tasks => {
      res.render('mainPage', {u:null, taskList: tasks});
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das tasks"})
    })
});
/* GET /tasks/edit/:id */
router.get('/tasks/edit/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.idTask)
    .then(task => {
      res.render('tasksFormEditPage', { t: task, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na edição da task"})
    })
});
/* GET /tasks/done/:id */
router.get('/tasks/done/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.idTask)
    .then(task => {
      res.render('tasksDoneEditPage', { t: task, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na resolução da task"})
    })
});
/* GET /tasks/delete/:id */
router.get('/tasks/delete/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.getTask(req.params.idTask)
    .then(task => {
      res.render('tasksDeletePage', { t: task, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo da task"})
    })
});
/* POST /users/register */
router.post('/users/register', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  User.addUser(req.body)
    .then(user=>{
      res.render('insertUserSucessPage',{id:user.id,name:user.nome,d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção do user"})
    })
});

/* POST /tasks/register */
router.post('/tasks/register', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.addTask(req.body)
    .then(task=>{
      res.render('insertTaskSucessPage',{id:task.id,deadline:task.deadline,who:task.who,what:task.what,d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na inserção da task"})
    })
});
/* POST /tasks/edit/:id */
router.post('/tasks/edit/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.updateTask(req.body)
    .then(task=>{
      res.render('editTaskConfirmPage',{d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na edição da task"})
    })
});
/* POST /tasks/done/:id */
router.post('/tasks/done/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.updateTask(req.body)
    .then(task=>{
      res.render('doneTaskConfirmPage',{d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na edição da task"})
    })
});
/* POST /tasks/delete/:id */
router.post('/tasks/delete/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Task.deleteTask(req.body)
    .then(task=>{
      res.redirect('/tasks')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na eliminação da task"})
    })
});
module.exports = router;