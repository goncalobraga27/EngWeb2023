var Exame = require("../models/exame")

// Lista de EMD
// GET /api/emd 
module.exports.list = () => {
   return Exame 
   .find({},{"nome":1,"data":1,"resultado":1}) 
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })

}
// GET /api/emd/:id
module.exports.getExame = id => {
    return Exame
    .findOne({_id: id})
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}
// GET /api/modalidades
module.exports.getModalidades = () => {
    return Exame 
   .distinct("modalidade") 
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

// GET /api/emd?res=OK
module.exports.getRes = param => {
    return Exame 
   .find({"resultado":param}) 
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

// GET /api/emd?modalidade=X
module.exports.getModalidade = (modalidade) => {
    return Exame.find({ modalidade: modalidade })
      .then((resposta) => {
        return resposta;
      })
      .catch((erro) => {
        return erro;
      });
  };

// GET /api/atletas?gen=F
module.exports.getGeneroNome = s => {
    return Exame 
    .aggregate([{ $match: { "género": s } }, {$project: { _id: 0,nomeCompleto: { $concat: [ "$nome.primeiro", " ", "$nome.último" ] }}},{ $sort: { nomeCompleto: 1 } } ])
    .then(dados=>{
        return dados
    })
    .catch(erro =>{ 
        return erro
    })
}
// GET /api/atletas?clube=X
module.exports.getClubeNome = clube => {
    return Exame 
    .aggregate([{ $match: { "clube": clube } }, {$project: { _id: 0,nomeCompleto: { $concat: [ "$nome.primeiro", " ", "$nome.último" ] }}},{ $sort: { nomeCompleto: 1 } } ])
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}