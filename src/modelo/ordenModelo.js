const { model, Schema } = require("mongoose");
const { genSalt, hash } = require("bcryptjs");

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
    }
});

const OrdenModelo = model("ordenes", ordenSchema);

exports.OrdenModelo = OrdenModelo;