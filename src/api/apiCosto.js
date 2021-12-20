const { Router } = require("express");
const costoRutas = Router();
const { costoModelo } = require('../modelo/costoModelo')


/* costoRutas.put("/editar", function (req, res) {
    const data = req.body;
    console.log(data);
    if (data.costo !== null && data.costo !== "") {
        costoModelo.updateOne( { $set: { costo: data.costo } }, function (error, c) {
            if (error) {
                console.log(error)
                return res.status(500).json({ estado: "error", msg: "ERROR: costo NO Actualizado!"})
            }
            res.status(200).json({ estado: "ok", msg: "costo Actualizado!" , data: c })
            console.log(data)
        })
    } else {
        const { costo } = data;
        const datos = { costo };
        const prod = new costoModelo(datos);
        prod.save(function (error) {
            if (error) {
                res.send({ estado: "error", msg: "ERROR: costo NO Guardado :(" });
                return false;
            }
            res.send({ estado: "ok", msg: "costo Guardado!" });
        })
    }
}); */

costoRutas.put("/editar", (req, res) => {
    const { costo } = req.body;
    costoModelo.updateOne({ costo }, function (error) {
        if (error) {
            return res.status(500).json({ estado: "error", msg: "ERROR al editar Costo" })
        } else {
            res.status(200).json({ estado: "ok", msg: "Costo editado Exitosamente" });
            }
        }
    )
})


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

exports.costoRutas = costoRutas;