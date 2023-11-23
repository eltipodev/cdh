/* eslint-disable no-unused-vars */

//////////////////////////////////////////////
///  importaciones                        ///
////////////////////////////////////////////

import "dotenv/config";
import { Router } from "express";
import express from "express";

import router from "./router/index.js";

// Crear una instancia de la aplicación Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

// Definir el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

//////////////////////////////////////////////
///  Iniciar servidor Express             ///
////////////////////////////////////////////

// Iniciar el servidor Express y escuchar en el puerto especificado
app.listen(PORT, () => {
	console.info(`Example app listening on port ${PORT} !`);
});

