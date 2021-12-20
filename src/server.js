const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { ordenRutas } = require('./api/apiOrden');
const { rutasUsuario } = require('./api/apiUsuario')
const {  routerRutas } = require('./api/apiRuta')
const {  costoRutas } = require('./api/apiCosto')

const app = express();
require("dotenv").config();

app.use(cors()) 
app.use(express.json());
app.use('/orden', ordenRutas);
app.use('/usuario', rutasUsuario);
app.use('/ruta', routerRutas);
app.use('/costo', costoRutas);

mongoose.connect(process.env.URL_DATABASE)
    .then(res => console.log("Conectado a BD"))
    .catch(error => console.log(error));

app.listen(8000, () => {
    console.log("Servidor escuchando en el puerto 8000...")
})