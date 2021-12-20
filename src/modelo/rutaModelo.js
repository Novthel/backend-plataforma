const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rutaSchema = new Schema({
    
    
    ruta: {
        type: "number",
        unique: true,
        required: true
    },

    origen: {
        type: "string",
        require: true
    },
    
    destino: {
        type: "string",
        required: true
    },

    distancia: {
        type: "string",
        require: true
    },

    
});

const rutaModelo = mongoose.model("rutas", rutaSchema);
exports.rutaModelo = rutaModelo;