const { Router } = require("express");
const routerRutas = Router();
const { rutaModelo } = require('../modelo/rutaModelo')


routerRutas.post("/agregar", function (req, res) {
    const data = req.body;
    const r = new rutaModelo(data);
    r.save(function (error) {
        if (error) {
            res.send({ estado: "error", msg: "ERROR: Ruta NO Guardada :(" });
            return false;
        }
        res.send({ estado: "ok", msg: "Ruta Guardada" });
    }) 
});

routerRutas.post("/consultar", function (req, res) {
    const { ruta } = req.body 
    rutaModelo.findOne({ ruta }, function (error, r) {
        if (error) {
            res.status(500).json({ estado: "error", msg: "ERROR al buscar la Ruta" })
        } else {
            if (r !== null) {
                res.status(200).json({ estado: "ok", msg: "Ruta Encontrada", data: r });
            } else {
                res.status(400).json({ estado: "error", msg: "Ruta no existe en BD" });
            }
        }
    })
})


routerRutas.get("/listar", function (req, res) {
    rutaModelo.find({}, function (error, r) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al buscar Ruta" })
        } else {
            if (r !== null) {
                res.send({ estado: "ok", msg: "Ruta Encontrada", data: r });
            } else {
                res.send({ estado: "error", msg: "Ruta NO Encontrada" });
            }
        }
    })
})



/* routerRutas.put("/editar", (req, res) => {
    const { ruta, origen, destino, distancia } = req.body;
    rutaModelo.updateOne({ ruta, origen, destino, distancia }, function (error) {
        if (error) {
            return res.status(500).json({ estado: "error", msg: "ERROR al editar Ruta" })
        } else {
            res.status(200).json({ estado: "ok", msg: "Ruta editada Exitosamente" });
            }
        }
    )
})
 */

routerRutas.post("/editar", function (req, res) {
    const data = req.body;
    if (data._id !== null && data._id !== "") {
        rutaModelo.updateOne({ _id: data._id }, { $set: { ruta: data.ruta, origen: data.origen, destino: data.destino, distancia: data.distancia } }, function (error) {
            if (error) {
                console.log(error)
                return res.status(500).json({ estado: "error", msg: "ERROR: Ruta NO Editada!" })
            }
            res.status(200).json({ estado: "ok", msg: "Cambio Exitoso!" })
        })
    } else {
        const { ruta, origen, destino, distancia } = data;
        const datos = { ruta, origen, destino, distancia };
        const r = new rutaModelo(datos);
        r.save(function (error) {
            if (error) {
                res.status(500).json({ estado: "error", msg: "ERROR: Ruta NO Guardada :(" });
                return false;
            }
            res.status(200).json({ estado: "ok", msg: "Ruta Guardada!" });
        })
    }
});




routerRutas.delete("/eliminar", (req, res) => {
    const { ruta } = req.body;
    rutaModelo.deleteOne({ ruta }, function (error) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al buscar No. Ruta" })
        } else {
                res.send({ estado: "ok", msg: "Ruta Eliminada Exitosamente" });
            }
        }
    )
})

exports.routerRutas = routerRutas;