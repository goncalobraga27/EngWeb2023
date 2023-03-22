var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/pessoas', function(req, res, next) {
  console.log("Estou a user a get para ver a lista de reg")
  Pessoa.list()
    .then (dados=> res.json(dados))
    .catch(erro=> res.status(601).json({erro:erro}))
});

router.get('/pessoas/:id', function(req, res, next) {
  console.log("Estou a user a get para ver o reg")
  Pessoa.getPessoa(req.params.id)
    .then(dados => {
      res.json(dados);
    })
    .catch(erro => res.status(602).json(({erro: erro})))
});

router.post('/pessoas',(req,res) => {
  console.log("Estou a user a post para colocar o reg")
  Pessoa.addPessoa(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(603).json({erro:erro}))

})

router.put('/pessoas/:id',(req,res) => {
  console.log("Estou a user a get para dar o update ao reg")
  Pessoa.updatePessoa(req.body)
    .then(dados => res.json(dados))
    .catch(erro => res.status(604).json({erro:erro}))

})

router.delete('/pessoas/:id',(req,res) => {
  console.log("Estou a user a get para deletar o reg")
  Pessoa.deletePessoa(req.params.id)
    .then(dados => res.json(dados))
    .catch(erro => res.status(605).json({erro:erro}))

})

module.exports = router;

