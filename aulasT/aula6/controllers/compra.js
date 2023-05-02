var Lista = require("../models/compra")

// Lista de listas de compras
module.exports.list = () => {
   return  Lista
   .find()
   .sort({_id:-1}) // 1 descendente e -1 ascendente 
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })

}

module.exports.getLista = id => {
    return Lista
    .findOne({_id: id})
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

module.exports.addLista = l => {
    return Lista.create(l)
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

module.exports.updateLista = l => {
    return Lista.updateOne({_id:l._id},l)
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

module.exports.deleteLista = id => {
    return Lista.deleteOne({_id:id})
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })
}

module.exports.categorias = () =>{
    return Lista.distinct("produtos.categoria")
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })

}

module.exports.prodsbyCat = () =>{
    return Lista.aggregate()
    .then(dados=>{
        return dados
    })
    .catch(erro =>{
        return erro
    })

}