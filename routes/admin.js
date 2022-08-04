const mongoose = require("mongoose")
require("../models/Categoria")
require("../models/Categoria2")
const Categoria = mongoose.model("categorias")
const Categoria2 = mongoose.model("fichas")
const express = require("express")
const router = express.Router()



router.post("/motor/search", (req,res) =>{

    var erros = []
    if((!req.body.client || typeof req.body.client == undefined || req.body.client == null) && (!req.body.os || typeof req.body.os == undefined || req.body.os == null)){
        erros.push({texto:"Preencha o campo 'Cliente' ou 'OS'!"})
    }
    if(req.body.client && req.body.os){
        erros.push({texto:"Preencha somente um dos campos!"})
    }
    if(erros.length > 0){
        res.render("admin/search",{erros: erros})
    }else{
        if(!req.body.client || typeof req.body.client == undefined || req.body.client == null){
            Categoria.find({os:{$regex:req.body.os}}).then((categorias) => {
                res.render("admin/search", {home: categorias})
            }).catch((err) => {
                req.flash("error_msg","Houve um erro ao lista as OS!")
                res.redirect("/")
            })
        }
        if(!req.body.os || typeof req.body.os == undefined || req.body.os == null){
            Categoria.find({client:{$regex:req.body.client}}).then((categorias) => {
                res.render("admin/search", {home: categorias})
            }).catch((err) => {
                req.flash("error_msg","Houve um erro ao lista as OS!")
                res.redirect("/")
            })
        }
    }
})

router.get("/motor/search/", (req,res) =>{
    res.render("admin/search",{
        style:'repairEngine.css'
    })

})

router.get("/", (req,res) => {
    Categoria.find().sort({_id:-1}).then((categorias) => {
        res.render("admin/home", {lista: categorias})
    }).catch((err) => {
        req.flash("error_msg","Houve um erro ao lista as OS!")
        res.redirect("/")
    })
}) //aqui
router.post("/motor/consult", (req,res) => {
    
    var erros = []
    if((!req.body.hp || typeof req.body.hp == undefined || req.body.hp == null) && (!req.body.marca || typeof req.body.marca == undefined || req.body.marca == null)&& (!req.body.diametro || typeof req.body.diametro == undefined || req.body.diametro == null)&& (!req.body.canais || typeof req.body.canais == undefined || req.body.canais == null)){
        erros.push({texto:"Preencha os campos!"})
    }
    if(req.body.diametro!='' && req.body.canais=='' && req.body.hp=='' && req.body.marca==''){
        erros.push({texto:"Preencha o campo 'Canais'!"})
    }
    if(req.body.diametro=='' && req.body.canais!='' && req.body.hp=='' && req.body.marca==''){
        erros.push({texto:"Preencha o campo 'Diametro'!"})
    }
    if(erros.length > 0){
        res.render("admin/consult",{erros: erros})
    }
    else{

        if(req.body.marca!='' && req.body.hp=='' && req.body.diametro=='' && req.body.canais==''){
            Categoria2.find({marca:{$regex:req.body.marca}}).then((ficha) => {
                res.render("admin/consult", {tabela: ficha})        
            }).catch((err) => {
                req.flash("error_msg","Houve um erro ao listar os Motores!")
                res.redirect("/")
            })
        }
        if(req.body.marca=='' &&req.body.hp!='' && req.body.diametro=='' && req.body.canais==''){
            Categoria2.find({hp:req.body.hp}).then((ficha) => {
                res.render("admin/consult", {tabela: ficha})        
            }).catch((err) => {
                req.flash("error_msg","Houve um erro ao listar os Motores!")
                res.redirect("/")
            })
        }
       
        if(req.body.hp!='' && req.body.marca!=''&& req.body.diametro=='' && req.body.canais==''){
            Categoria2.find({marca:{$regex:req.body.marca},hp:req.body.hp}).then((ficha) => {
                res.render("admin/consult", {tabela: ficha})        
            }).catch((err) => {
                req.flash("error_msg","Houve um erro ao listar os Motores!")
                res.redirect("/")
            })
        }

        if(req.body.diametro!='' && req.body.canais!='' && req.body.marca=='' && req.body.hp==''){
            
            Categoria2.find({diametro:req.body.diametro,canais:req.body.canais}).then((ficha) => {
                res.render("admin/consult", {tabela: ficha})        
            }).catch((err) => {
                req.flash("error_msg","Houve um erro ao listar os Motores!")
                res.redirect("/")
            })
        } 
        if(req.body.diametro!='' && req.body.canais!='' && req.body.hp!=''){
            Categoria2.find({diametro:req.body.diametro,canais:req.body.canais,hp:req.body.hp}).then((ficha) => {
                res.render("admin/consult", {tabela: ficha})        
            }).catch((err) => {
                req.flash("error_msg","Houve um erro ao listar os Motores!")
                res.redirect("/")
            })
        }           
    }
})
router.get("/motor/consult", (req,res) =>{
    res.render("admin/consult",{
        style:'repairEngine.css'
    })

})

router.get("/motor/postagens", (req, res) =>{
    res.render("admin/postagens")
})
router.get("/motor/postagensadd", (req,res) => {
    res.render("admin/addpostagem")
})
router.post("/motor/posgatensnova", (req,res) => {
    const novaPostagem = {
    Marca: req.body.Marca,
    HP: req.body.HP,
    Comprimento: req.body.Comprimento,
    Diametro: req.body.Diametro,
    Modelo:  req.body.Modelo,
    Canais:  req.body.Canais,
    Passo:  req.body.Passo,
    Ligacao: req.body.Ligacao,
    Tensao: req.body.Tensao,
    Espiras: req.body.Espiras,
    Fios: req.body.Fios,
    Peso: req.body.Peso,
    }
    new Categoria(novaPostagem).save().then(() => {
        res.redirect("/")

    }).catch((err) => {

    })
})
router.get("/motor/view/:id", (req, res) =>{
    Categoria.find({_id:req.params.id}).then((categoria) => {
        res.render("admin/view", {view:categoria})
    }).catch((err) => {
        req.flash("error_msg", "Essa categoria não existe")
        res.redirect("/")
    }) 
    
})
router.get('/motor/add', (req,res) => {
    res.render("admin/addEngine",{
        style:'addEngine.css'
    })
})
router.get('/motor/removeWire', (req,res) => {
    res.render("admin/removeWire",{
        style:'addEngine.css'
    })
})
router.get("/motor/repair", (req,res) => {
    res.render("admin/repairEngine",{
        style:'repairEngine.css'
    })
})

router.post("/motor/nova", (req, res) => {

    var erros = []

    if(!req.body.client || typeof req.body.client == undefined || req.body.client == null){
        erros.push({texto:"Nome do Cliente Obrigatório!"})
    }
    if(!req.body.os || typeof req.body.os == undefined || req.body.os == null){
        erros.push({texto:"OS Obrigatório!"})
    }
    if(erros.length > 0){
        res.render("admin/addEngine",{erros: erros})
    }else {
        const novaCategoria = {
            data:req.body.data,
            client: req.body.client,
            os: req.body.os,
            proposal: req.body.proposal,
            engineBrand: req.body.engineBrand,
            turnedOn: req.body.turnedOn,
            power: req.body.power,
            rotation: req.body.rotation,
            model: req.body.model,
            boxNumber: req.body.boxNumber,
            type: req.body.type,
            connectionBox: req.body.connectionBox,
            flange: req.body.flange,
            withFeet: req.body.withFeet,
            engineStatus: req.body.engineStatus,
            pulley: req.body.pulley,
            voltage: req.body.voltage,
            mountingSide: req.body.mountingSide,
            packageLength:req.body.packageLength,
            packageDiameter:req.body.packageDiameter,
            grooves:req.body.grooves,
            leadingTip:req.body.leadingTip,
            rearBearing:req.body.rearBearing,
            rearRetainer:req.body.rearRetainer,
            frontBearing:req.body.frontBearing,
            frontRetainer:req.body.frontRetainer,
            capacitor:req.body.capacitor,
            concertType:req.body.concertType,
            frontRing:req.body.frontRing,
            frontCover:req.body.frontCover,
            burnReason:req.body.burnReason,
            backRing:req.body.backRing,
            backCover:req.body.backCover,
            polypropyleneFan:req.body.polypropyleneFan,
            aluminumFan:req.body.aluminumFan,
            connectionBoxCheck:req.body.connectionBoxCheck,
            deflector:req.body.deflector,
            terminalBoard:req.body.terminalBoard,
            pasta:req.body.pasta,
            replaceFrontBearing:req.body.replaceFrontBearing,
            replaceRearBearing:req.replaceRearBearing,
            fitsKey:req.body.fitsKey,
            keyElectronics:req.body.keyElectronics,
            brakeElectromagnet:req.body.brakeElectromagnet,
            bridgeRectifier:req.body.bridgeRectifier,
            hollowCarcass:req.body.hollowCarcass,
            rewindElectromagnet:req.body.rewindElectromagnet,
            armor:req.body.armor,
            nightclubCanvas:req.body.nightclubCanvas,
            disc:req.body.disc,
            brakePad:req.body.brakePad,
            spring:req.body.spring,
            centrifugal:req.body.centrifugal,
            platinum:req.body.platinum,
            capacitorCover:req.body.capacitorCover,
            makeCover:req.body.makeCover,
            strap:req.body.strap,
            eyelet:req.body.eyelet,
            nameplate:req.body.nameplate,
            adpConnectionBox:req.body.adpConnectionBox,
            adpFan:req.body.adpFan,
            adpDeflector:req.body.adpDeflector,
            third1:req.body.third1,
            serviceFrontCover1:req.body.serviceFrontCover1,
            serviceLeadingTip1:req.body.serviceLeadingTip1,
            serviceBackCover1:req.body.serviceBackCover1,
            serviceAluminumSolder1:req.body.serviceAluminumSolder1,
            third2:req.body.third2,
            serviceFrontCover2:req.body.serviceFrontCover2,
            serviceLeadingTip2:req.body.serviceLeadingTip2,
            serviceBackCover2:req.body.serviceFrontCover2,
            serviceAluminumSolder2:req.body.serviceAluminumSolder2,
            serialNumber:req.body.serialNumber,
            note:req.body.note,
            collaborated:req.body.collaborated,
            dateCollaborated:req.body.dateCollaborated,
            date: req.body.date,
        }
        new Categoria(novaCategoria).save().then(() => {
            req.flash("success_msg", "Ficha criada com sucesso!")
            res.redirect("/motor/add")
        }).catch((err) => {
            req.flash("error_msg","Erro ao salvar!")
            res.redirect("/")
        })

    }

})

router.get("/motor/edit/:id", (req, res) =>{
    Categoria.findOne({_id:req.params.id}).then((categoria) => {
        res.render("admin/editEngine", {categoria:categoria})
    }).catch((err) => {
        req.flash("error_msg", "Essa categoria não existe")
        res.redirect("/")
    }) 
    
})
router.get("/motor/reparo/:id", (req, res) =>{
    Categoria.findOne({_id:req.params.id}).then((categoria) => {
        res.render("admin/repairEngine", {categoria:categoria})
    }).catch((err) => {
        req.flash("error_msg", "Essa categoria não existe")
        res.redirect("/")
    }) 
    
})
router.get("/motor/allEdit/:id", (req, res) =>{
    Categoria.findOne({_id:req.params.id}).then((categoria) => {
        res.render("admin/allEdit", {categoria:categoria})
    }).catch((err) => {
        req.flash("error_msg", "Essa categoria não existe")
        res.redirect("/")
    }) 
    
})

router.post("/motor/edit", (req,res) =>{
    Categoria.findOne({_id: req.body.id}).then((categoria) =>{
        categoria.client= req.body.client
        categoria.os= req.body.os
        categoria.proposal= req.body.proposal
        categoria.engineBrand= req.body.engineBrand
        categoria.turnedOn= req.body.turnedOn
        categoria.power= req.body.power
        categoria.rotation= req.body.rotation
        categoria.model= req.body.model
        categoria.boxNumber= req.body.boxNumber
        categoria.type= req.body.type
        categoria.connectionBox= req.body.connectionBox
        categoria.flange= req.body.flange
        categoria.withFeet= req.body.withFeet
        categoria.engineStatus= req.body.engineStatus
        categoria.pulley= req.body.pulley
        categoria.voltage= req.body.voltage
        categoria.mountingSide= req.body.mountingSide
        categoria.save().then(() =>
        {
            req.flash("success_msg", "Ficha editada com sucesso!")
            res.redirect("/")
        }).catch((err) =>{
        req.flash("error_msg","Erro ao editar!")
            res.redirect("/")
    })
    }).catch((err) =>{
        req.flash("error_msg","Erro ao editar!")
            res.redirect("/")
    })
})
router.post("/motor/repair", (req,res) =>{
    
    Categoria.findOne({_id: req.body.id}).then((categoria) =>{
        categoria.packageLength= req.body.packageLength
        categoria.packageDiameter= req.body.packageDiameter
        categoria.grooves= req.body.grooves
        categoria.leadingTip= req.body.leadingTip
        categoria.rearBearing= req.body.rearBearing
        categoria.rearRetainer= req.body.rearRetainer
        categoria.frontBearing= req.body.frontBearing
        categoria.frontRetainer= req.body.frontRetainer
        categoria.capacitor= req.body.capacitor
        categoria.concertType= req.body.concertType
        categoria.frontRing= req.body.frontRing
        categoria.frontCover= req.body.frontCover
        categoria.burnReason= req.body.burnReason
        categoria.backRing= req.body.backRing
        categoria.backCover= req.body.backCover
        categoria.polypropyleneFan= req.body.polypropyleneFan
        categoria.aluminumFan= req.body.aluminumFan
        categoria.connectionBoxCheck= req.body.connectionBoxCheck
        categoria.deflector= req.body.deflector
        categoria.terminalBoard= req.body.terminalBoard
        categoria.pasta= req.body.pasta
        categoria.replaceFrontBearing= req.body.replaceFrontBearing 
        categoria.replaceRearBearing= req.body.replaceRearBearing
        categoria.fitsKey= req.body.fitsKey
        categoria.keyElectronics= req.body.keyElectronics
        categoria.brakeElectromagnet= req.body.brakeElectromagnet
        categoria.bridgeRectifier= req.body.bridgeRectifier
        categoria.hollowCarcass= req.body.hollowCarcass
        categoria.rewindElectromagnet= req.body.rewindElectromagnet
        categoria.armor= req.body.armor
        categoria.nightclubCanvas= req.body.nightclubCanvas
        categoria.disc= req.body.disc
        categoria.brakePad= req.body.brakePad
        categoria.spring= req.body.spring
        categoria.centrifugal= req.body.centrifugal
        categoria.platinum= req.body.platinum
        categoria.capacitorCover= req.body.capacitorCover
        categoria.makeCover= req.body.makeCover
        categoria.strap= req.body.strap
        categoria.eyelet= req.body.eyelet
        categoria.nameplate= req.body.nameplate
        categoria.adpConnectionBox= req.body.adpConnectionBox
        categoria.adpFan= req.body.adpFan
        categoria.adpDeflector= req.body.adpDeflector
        categoria.third1= req.body.third1
        categoria.serviceFrontCover1= req.body.serviceFrontCover1
        categoria.serviceLeadingTip1= req.body.serviceLeadingTip1
        categoria.serviceBackCover1= req.body.serviceBackCover1
        categoria.serviceAluminumSolder1= req.body.serviceAluminumSolder1
        categoria.third2= req.body.third2
        categoria.serviceFrontCover2= req.body.serviceFrontCover2
        categoria.serviceLeadingTip2= req.body.serviceLeadingTip2
        categoria.serviceBackCover2= req.body.serviceBackCover2
        categoria.serviceAluminumSolder2= req.body.serviceAluminumSolder2
        categoria.serialNumber= req.body.serialNumber
        categoria.note= req.body.note
        categoria.collaborated= req.body.collaborated
        categoria.dateCollaborated= req.body.dateCollaborated
        categoria.save().then(() =>
        {
            req.flash("success_msg", "Ficha editada com sucesso!")
            res.redirect("/")
        }).catch((err) =>{
        req.flash("error_msg","Erro ao editar!")
            res.redirect("/")
    })
    }).catch((err) =>{
        req.flash("error_msg","Erro ao editar!")
            res.redirect("/")
    })
})
router.post("/motor/allEdit", (req,res) =>{
    Categoria.findOne({_id: req.body.id}).then((categoria) =>{
        categoria.client= req.body.client
        categoria.os= req.body.os
        categoria.proposal= req.body.proposal
        categoria.engineBrand= req.body.engineBrand
        categoria.turnedOn= req.body.turnedOn
        categoria.power= req.body.power
        categoria.rotation= req.body.rotation
        categoria.model= req.body.model
        categoria.boxNumber= req.body.boxNumber
        categoria.type= req.body.type
        categoria.connectionBox= req.body.connectionBox
        categoria.flange= req.body.flange
        categoria.withFeet= req.body.withFeet
        categoria.engineStatus= req.body.engineStatus
        categoria.pulley= req.body.pulley
        categoria.voltage= req.body.voltage
        categoria.mountingSide= req.body.mountingSide
        categoria.save().then(() =>{
            req.flash("success_msg", "Ficha editada com sucesso!")
            res.redirect("/")
        }).catch((err) =>{
        req.flash("error_msg","Erro ao editar!")
            res.redirect("/")
    })
    }).catch((err) =>{
        req.flash("error_msg","Erro ao editar!")
            res.redirect("/")
    })
})


module.exports = router