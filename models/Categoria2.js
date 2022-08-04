const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const Categoria2 = Schema({
    marca: {
        type:String,
        required:true,
    },
    hp:{
        type:String,
        required:true
    },
    comprimento: {
        type:String,
        required:true
    },
    diametro:{
        type:String,
        required:true
    },
    modelo:{
        type:String,
        required:true
    },
    canais: {
        type:String,
        required:true
    },
    passo: {
        type:String,
        required:true
    },
    ligacao: {
        type:String,
        required:true
    },
    tensao:{
        type:String,
        required:true
    },
    espiras:{
        type:String,
        required:true
    },
    fios:{
        type:String,
        required:true
    },
    peso: {
        type:String,
        required:true
    },

    date: {
        type: Date,
        default: Date.now()
    },
    model:{},
})

mongoose.model("fichas", Categoria2)


