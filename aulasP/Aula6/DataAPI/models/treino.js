var mongoose = require ('mongoose')



var treinoSchema= new mongoose.Schema({
        _id:String,
        nome:String,
        modalidade:String,
        duracao:Number,
        data:String
})

module.exports = mongoose.model('treino',treinoSchema)