const { Router } = require("express");
const costoRutas = Router();
const { costoModelo } = require('../modelo/costoModelo')


costoRutas.post("/editar", function (req, res) {
    const data = req.body;
    if (data.precio !== null && data.precio !== "" &&  data.precio !== undefined) {
        console.log(data.precio);
        costoModelo.updateOne( { $set: { precio: data.precio } }, function (error) {
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


costoRutas.get("/listar", function (req, res) {
    costoModelo.find({}, function (error, c) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al buscar Costo" })
        } else {
            if (c !== null) {
                res.send({ estado: "ok", msg: "Costo Encontrado", data: c });
            } else {
                res.send({ estado: "error", msg: "Costo NO Encontrado" });
            }
        }
    })
})


costoRutas.post("/agregar", function (req, res) {
    const data = req.body;
    const valor = new costoModelo(data);
   valor.save(function (error) {
        if (error) {
            res.send({ estado: "error", msg: "ERROR: Producto NO Guardado :(" });
            return false;
        }
        res.send({ estado: "ok", msg: "Producto Guardado!" });
    }) 
});



exports.costoRutas = costoRutas;