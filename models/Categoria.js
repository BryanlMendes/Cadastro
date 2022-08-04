const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const Categoria = new Schema({
    data: {
        type:String,
    },
    client: {
        type:String,
        required:true,
        uppercase:true
    },
    os: {
        type: String,
        required: false
    },
    proposal: {
        type: String,
        required: false
    },
    engineBrand: {
        type: String,
        required: false,
        uppercase:true
    },
    turnedOn: {
        type: String,
        required: false
    },
    power: {
        type: String,
        required: false,
        uppercase:true
    },
    rotation: {
        type: String,
        required: false
    },
    model: {
        type: String,
        required: false,
        uppercase:true
    },
    boxNumber: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: false
    },
    connectionBox: {
        type: String,
        required: false
    },
    flange: {
        type: String,
        required: false
    },
    withFeet: {
        type: String,
        required: false
    },
    engineStatus: {
        type: String,
        required: false
    },
    pulley: {
        type: String,
        required: false
    },
    voltage: {
        type: String,
        required: false
    },
    mountingSide: {
        type: String,
        required: false
    },
    packageLength: {
        type: String,
        required: false
    },
    packageDiameter: {
        type: String,
        required: false
    },
    grooves: {
        type: String,
        required: false
    },
    leadingTip: {
        type: String,
        required: false
    },
    rearBearing: {
        type: String,
        required: false
    },
    rearRetainer: {
        type: String,
        required: false
    },
    frontBearing: {
        type: String,
        required: false
    },
    frontRetainer: {
        type: String,
        required: false
    },
    capacitor: {
        type: String,
        required: false
    },
    concertType: {
        type: String,
        required: false
    },
    frontRing: {
        type: String,
        required: false
    },
    frontCover: {
        type: String,
        required: false
    },
    burnReason: {
        type: String,
        required: false
    },
    backRing: {
        type: String,
        required: false
    },
    backCover: {
        type: String,
        required: false
    },
    polypropyleneFan: {
        type: String,
        required: false
    },
    aluminumFan: {
        type: String,
        required: false
    },
    connectionBoxCheck : {
        type: String,
        required: false
    },
    deflector: {
        type: String,
        required: false
    },
    terminalBoard: {
        type: String,
        required: false
    },
    pasta: {
        type: String,
        required: false
    },
    replaceFrontBearing: {
        type: String,
        required: false
    },
    replaceRearBearing: {
        type: String,
        required: false
    },
    fitsKey: {
        type: String,
        required: false
    },
    keyElectronics: {
        type: String,
        required: false
    },
    brakeElectromagnet: {
        type: String,
        required: false
    },
    bridgeRectifier: {
        type: String,
        required: false
    },
    hollowCarcass: {
        type: String,
        required: false
    },
    rewindElectromagnet: {
        type: String,
        required: false
    },
    armor: {
        type: String,
        required: false
    },
    nightclubCanvas: {
        type: String,
        required: false
    },
    disc: {
        type: String,
        required: false
    },
    brakePad: {
        type: String,
        required: false
    },
    spring: {
        type: String,
        required: false
    },
    centrifugal: {
        type: String,
        required: false
    },
    platinum: {
        type: String,
        required: false
    },
    capacitorCover: {
        type: String,
        required: false
    },
    makeCover: {
        type: String,
        required: false
    },
    strap: {
        type: String,
        required: false
    },
    eyelet: {
        type: String,
        required: false
    },
    nameplate: {
        type: String,
        required: false
    },
    adpConnectionBox: {
        type: String,
        required: false
    },
    adpFan: {
        type: String,
        required: false
    },
    adpDeflector: {
        type: String,
        required: false
    },
    third1: {
        type: String,
        required: false
    },
    serviceFrontCover1: {
        type: String,
        required: false
    },
    serviceLeadingTip1: {
        type: String,
        required: false
    },
    serviceBackCover1: {
        type: String,
        required: false
    },
    serviceAluminumSolder1: {
        type: String,
        required: false
    },
    third2: {
        type: String,
        required: false
    },
    serviceFrontCover2: {
        type: String,
        required: false
    },
    serviceLeadingTip2: {
        type: String,
        required: false
    },
    serviceBackCover2: {
        type: String,
        required: false
    },
    serviceAluminumSolder2: {
        type: String,
        required: false
    },
    serialNumber: {
        type: String,
        required: false
    },
    note: {
        type: String,
        required: false
    },
    collaborated: {
        type: String,
        required: false
    },
    dateCollaborated: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("categorias", Categoria)


