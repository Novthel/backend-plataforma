const { Router } = require("express");
const ordenRutas = Router();
const { ordenModelo } = require("../modelo/ordenModelo");


// Consultar orden despacho especifico con el numero de orden
ordenRutas.post("/consultar", function (req, res) {
    const { codigo } = req.body 
    ordenModelo.findOne({ codigo }, function (error, orden) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al buscar No. Orden" })
        } else {
            if (orden !== null) {
                res.send({ estado: "ok", msg: "No. Orden Encontrada", data: orden });
            } else {
                res.send({ estado: "error", msg: "No. Orden no existe en BD" });
            }
        }
    })
})


// listar ordenes de despacho
ordenRutas.post("/listar", function (req, res) {
    ordenModelo.find({}, function (error, orden) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al buscar Producto" })
        } else {
            if (orden !== null) {
                res.send({ estado: "ok", msg: "Producto Encontrado", data: orden });
            } else {
                res.send({ estado: "error", msg: "Producto NO Encontrado" });
            }
        }
    })
})


ordenRutas.post("/guardar", function (req, res) {
    const data = req.body;
    const orden = new ordenModelo(data);
    orden.save(function (error) {
        if (error) {
            res.send({ estado: "error", msg: "ERROR: Producto NO Guardado :(" });
            return false;
        }
        res.send({ estado: "ok", msg: "Producto Guardado!" });
    })
});


ordenRutas.post("/editar", (req, res) => {

    const { nombre, precio, stock } = req.body;
    // Crear un JSON con los datos capturados
    const orden = { title: nombre, price: precio, stock };
    // Edita el producto en el array
    let i = 0;
    for (const p of ordenes) {
        if (p.title.toLowerCase() == nombre.toLowerCase()) {
            ordenes[i] = orden;
            break;
        }
        i++;
    }
    res.send({ estado: "ok", msg: "Producto Editado!" });
})


ordenRutas.post("/eliminar", (req, res) => {
    const { codigo } = req.body;
    let i = 0;
    for (const o of ordenes) {
        if (o.title.toLowerCase() == codigo.toLowerCase()) {
            ordenes.splice(i, 1);
            break;
        }
        i++;
    }
    res.send({ estado: "ok", msg: "Orden de despacho Eliminada!" });
})

exports.ordenRutas = ordenRutas;