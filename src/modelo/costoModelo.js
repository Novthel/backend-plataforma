const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const costoSchema = new Schema({

    precio: {
        type: "number",
        required: true
    }
    
});

const costoModelo = mongoose.model("costos", costoSchema);
exports.costoModelo = costoModelo;