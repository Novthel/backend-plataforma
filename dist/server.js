"use strict";

const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/transportedb').then(res => console.log("Conectado a BD")).catch(error => console.log(error));
app.listen(5000, () => {
  console.log("Servidor escuchando en el puerto 8080...");
});
//# sourceMappingURL=server.js.map