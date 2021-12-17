const { Router } = require("express");
const rutasUsuario = Router();
const { usuarioModelo } = require('../modelo/usuarioModelo')
const { compare } = require("bcrypt")
const { sign } = require("jsonwebtoken");
const { usuarioGuard } = require('../guard/usuarioGuard')

rutasUsuario.post("/login", async function (req, res) {
   
    const { usuario, password } = req.body;  
    
    const user = await usuarioModelo.findOne({ usuario: req.body.usuario});
    const allUser= await usuarioModelo.find()
    console.log(user)      // Busqueda en BD el usuario
    if (!user) {
        return res.status(404).send({ estado: "error", msg: "Usuario o Contraseña incorrecta" });
    }
    const clave = await compare(password, user.password);
    if (clave === true) {
        const token = sign(
            {
                usuario: user.usuario,
                rol: user.rol
            },
            process.env.CLAVE_SECRET
        )

        return res.status(200).send({ estado: "ok", msg: "Logueado", token });
    }
    return res.status(401).send({ estado: "error", msg: "Usuario o Contraseña incorrecta" });
});

<<<<<<< HEAD
rutasUsuario.post("/registro",  function (req, res) {
=======
rutasUsuario.post("/registro", function (req, res) {
>>>>>>> f1b0cbf4ee5d6922e1d5ed00bb6eaeac19f76961
    const datos = req.body;
    const user = new usuarioModelo(datos);
    user.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "error", msg: "ERROR: Usuario NO registrado" });
        }
        return res.status(200).send({ estado: "ok", msg: "Registro Exitoso!" });
    });
})


exports.rutasUsuario = rutasUsuario;