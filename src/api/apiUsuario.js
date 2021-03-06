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

rutasUsuario.post("/registro",  function (req, res) {
    const datos = req.body;
    const user = new usuarioModelo(datos);
    user.save(function (error) {
        if (error) {
            return res.status(500).send({ estado: "error", msg: "ERROR: Usuario NO registrado" });
        }
        return res.status(200).send({ estado: "ok", msg: "Registro Exitoso!" });
    });
})

rutasUsuario.get("/listar", function (req, res) {
    usuarioModelo.find({}, function (error, user) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al buscar Producto" })
        } else {
            if (user !== null) {
                res.send({ estado: "ok", msg: "Producto Encontrado", data: user });
            } else {
                res.send({ estado: "error", msg: "Producto NO Encontrado" });
            }
        }
    })
})


rutasUsuario.delete("/eliminar", (req, res) => {
    const { usuario } = req.body;
    usuarioModelo.deleteOne({ usuario }, function (error) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al buscar No. Orden" })
        } else {
                res.send({ estado: "ok", msg: "Usuario Eliminado Exitosamente" });
            }
        }
    )
})

rutasUsuario.post("/editar", function (req, res) {
    const data = req.body;
    console.log('voy por aqui');
    console.log(data);
    if (data.usuario !== null && data.usuario !== "" &&  data.usuario !== undefined) {
        
        usuarioModelo.updateOne({ usuario: data.usuario }, { $set: { nombre: data.nombre, apellido: data.apellido, usuario: data.usuario,  celular: data.celular, correo: data.correo, password : data.password, rol: data.rol} }, function (error) {
            if (error) {
                console.log(error)
                return res.status(500).json({ estado: "error", msg: "ERROR: No se pudo Editar !"})
            }
            res.status(200).json({ estado: "ok", msg: "Cambio Exitoso! "})
        })
    } else {
            res.status(500).json({ estado: "error", msg: "ERROR: No se pudo Editar :(" });
        
            }  
        });


exports.rutasUsuario = rutasUsuario;