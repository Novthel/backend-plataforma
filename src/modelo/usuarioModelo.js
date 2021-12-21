const { model, Schema } = require("mongoose");
const { genSalt, hash } = require("bcrypt");

const usuarioSchema = new Schema({
    
    nombre: {
        type: "string",
        required: true,
        max: 150
    }, 
    
    apellido: {
        type: "string",
        max: 150
    }, 
    
    usuario: {
        type: "string",
        required: true,
        unique: true,
        max: 120
    },

    celular: {
        type: "string",
        required: true,
    },

    correo: {
        type: "string",
        required: true,
        max: 150
    },

    password: {
        type: "string",
        min: 6
    },

    rol: {
        type: "string",
       
    }

});

usuarioSchema.pre("save", async function (next) {
    const salt = await genSalt(+process.env.BCRYPT_ROUNDS);
    this.password = await hash(this.password, salt);
    next();
})

const usuarioModelo = model("usuarios", usuarioSchema);

exports.usuarioModelo = usuarioModelo;