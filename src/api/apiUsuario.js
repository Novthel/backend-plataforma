const { Router } = require("express");
const rutasUsuario = Router();
const { usuarioModelo } = require('../modelo/usuarioModelo')
const { compare } = require("bcrypt")
const { sign } = require("jsonwebtoken");
const { usuarioGuard } = require('../guard/usuarioGuard')

rutasUsuario.post("/login", async function (req, res) {
   
    const { usuario, password } = req.body;                     // Por medio de desestructuracion Capturo el usuario y password
    const user = await usuarioModelo.findOne({ usuario });      // Busqueda en BD el usuario
    if (!user) {
        return res.status(401).send({ estado: "error", msg: "Usuario o Contraseña incorrecta" });
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

rutasUsuario.post("/registro", usuarioGuard, function (req, res) {
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