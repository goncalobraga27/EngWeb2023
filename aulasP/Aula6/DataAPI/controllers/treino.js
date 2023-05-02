var Treino = require("../models/treino")

// Treino list
module.exports.list = () => {
   return  Treino
   .find()
   .sort({data:-1}) // 1 descendente e -1 ascendente 
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })

}

module.exports.getTreino = id => {
    return Treino
    .findOne({_id: id})
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

module.exports.addTreino = t => {
    return Treino.create(t)
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

module.exports.updateTreino = t => {
    return Treino.updateOne({_id:t._id},t)
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

module.exports.deleteTreino = id => {
    return Treino.deleteOne({_id:id})
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}