var express = require('express');
var router = express.Router();
var Exame = require('../controllers/exames')
/* GET /api/emd?res=OK | GET /api/emd?modalidade=futebol */
router.get('/api/emd', function(req, res) {
  if (req.query.res || req.query.modalidade) {
    if (req.query.res && req.query.res == "OK") {
      Exame.getRes(true)
        .then(dados => {
          console.log()
          res.status(200).json(dados)
        })
        .catch(erro => {
          res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
      })
    } else if (req.query.modalidade) {
      Exame.getModalidade(req.query.modalidade)
        .then(dados => {
          res.status(200).json(dados)
        })
        .catch(erro => {
          res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
      })
    } else {
      res.status(520).json({mensagem: "Query inválida."})
    }
  } else {
    Exame.list()
      .then(dados => {
        res.status(200).json(dados)
      })
      .catch(erro => {
        res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
      })
  }
});

// GET /api/emd
router.get('/api/emd', function(req, res, next) {
  console.log("Entro aqui")
  Exame.list()
    .then(exames => {
      res.jsonp(exames)
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de exames"})
    })
});
/* GET /api/emd/:id */
router.get('/api/emd/:id', function(req, res, next) {
  Exame.getExame(req.params.id)
    .then(exame => {
      res.jsonp(exame);
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do exame pretendido"})
    })
});
/* GET /api/modalidades */
router.get('/api/modalidades', function(req, res, next) {
  Exame.getModalidades()
    .then(modalidades => {
      res.jsonp(modalidades);
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção das modalidades existentes"})
    })
});

/* GET /api/atletas?gen=F | GET /api/atletas?clube=X */
router.get('/api/atletas', function(req, res) {
  if (req.query.gen || req.query.clube) {
    if (req.query.gen && req.query.gen == "F") {
      Exame.getGeneroNome("F")
        .then(dados => {
          console.log()
          res.status(200).json(dados)
        })
        .catch(erro => {
          res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de atletas do sexo feminino"})
      })
    }
    else if (req.query.gen && req.query.gen == "M") {
      Exame.getGeneroNome("M")
        .then(dados => {
          console.log()
          res.status(200).json(dados)
        })
        .catch(erro => {
          res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de atletas do sexo masculino"})
      })
    }
     else if (req.query.clube) {
      Exame.getClubeNome(req.query.clube)
        .then(dados => {
          res.status(200).json(dados)
        })
        .catch(erro => {
          res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de jogadores de um determinado clube"})
      })
    } else {
      res.status(520).json({mensagem: "Query inválida."})
    }
  } else {
    Exame.list()
      .then(dados => {
        res.status(200).json(dados)
      })
      .catch(erro => {
        res.status(520).json({erro: erro, mensagem: "Não consegui obter a lista de exames."})
      })
  }
});


module.exports = router;
