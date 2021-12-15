const { Router } = require("express");
const ordenRutas = Router();

// Consultar orden despacho especifico con el numero de orden
ordenRutas.post("/consultar", function (req, res) {
    const { codigo } = req.body 
    Productos.findOne({ codigo }, function (error, prod) {
        if (error) {
            return res.send({ estado: "error", msg: "ERROR al buscar No. Orden" })
        } else {
            if (prod !== null) {
                res.send({ estado: "ok", msg: "No. Orden Encontrada", data: prod });
            } else {
                res.send({ estado: "error", msg: "No. Orden no existe en BD" });
            }
        }
    })
})

ordenRutas.post("/guardar", function (req, res) {
    const data = req.body;
    const prod = new Productos(data);
    prod.save(function (error) {
        if (error) {
            res.send({ estado: "error", msg: "ERROR: Producto NO Guardado :(" });
            return false;
        }
        res.send({ estado: "ok", msg: "Producto Guardado!" });
    })
});

ordenRutas.post("/editar", (req, res) => {
    // Capturar los datos que vienen del cliente
    const { nombre, precio, stock } = req.body;
    // Crear un JSON con los datos capturados
    const prod = { title: nombre, price: precio, stock };
    // Edita el producto en el array
    let i = 0;
    for (const p of productos) {
        if (p.title.toLowerCase() == nombre.toLowerCase()) {
            productos[i] = prod;
            break;
        }
        i++;
    }
    // Responder al cliente
    res.send({ estado: "ok", msg: "Producto Editado!" });
})



ordenRutas.post("/eliminar", (req, res) => {
    // Capturar los datos que vienen del cliente
    const { nombre } = req.body;
    // Edita el producto en el array
    let i = 0;
    for (const p of productos) {
        if (p.title.toLowerCase() == nombre.toLowerCase()) {
            productos.splice(i, 1);
            break;
        }
        i++;
    }
    // Responder al cliente
    res.send({ estado: "ok", msg: "Producto Eliminado!" });
})

exports.ordenRutas = ordenRutas;