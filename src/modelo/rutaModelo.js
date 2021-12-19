const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordenSchema = new Schema({
    
    
    codigo: {
        type: "number",
        unique: true,
        required: true
    },

    cliente: {
        type: "string",
        require: true
    },
    
    nombreProd: {
        type: "string",
        unique: true,
        required: true
    },

    descripcion: {
        type: "string",
        require: true
    },

    peso: {
        type: "string",
        require: true
    },

    origen: {
        type: "string",
        require: true
    },

    destino: {
        type: "string",
        require: true
    },

    camiones: {
        type: "number",
        required: true
    },

    precio: {
        type: "number",
        required: true
    },
    estado: {
        type: "string",
        require: true
    },

    fecha:{
        type: "date",
        required: true,
        default: new Date()
    },
});

const ordenModelo = mongoose.model("ordenes", ordenSchema);
exports.ordenModelo = ordenModelo;