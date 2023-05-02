var express = require('express');
var router = express.Router();
var Treino = require('../controllers/treino')
/* GET home page. */
router.get('/treinos', function(req, res, next) {
  Treino.list()
    .then (dados=> res.json(dados))
    .catch(erro=> res.status(601).json({erro:erro}))
});

/* GET Treino page. */
router.get('/treinos/:id', function(req, res, next) {
  Treino.getTreino(req.params.id)
    .then(dados => {
      res.json(dados);
    })
    .catch(erro => res.status(602).json(({erro: erro})))
});

router.post('/treinos',(req,res) => {
  Treino.addTreino(req.body)
    .then(dados => res.status(201).json(dados))
    .catch(erro => res.status(603).json({erro:erro}))

})

router.put('/treinos/:id',(req,res) => {
  Treino.updateTreino(req.body)
    .then(dados => res.json(dados))
    .catch(erro => res.status(604).json({erro:erro}))

})

router.delete('/treinos/:id',(req,res) => {
  Treino.deleteTreino(req.params.id)
    .then(dados => res.json(dados))
    .catch(erro => res.status(605).json({erro:erro}))

})

module.exports = router;
