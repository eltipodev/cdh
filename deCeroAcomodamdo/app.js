/* eslint-disable no-unused-vars */

//////////////////////////////////////////////
///  importaciones                        ///
////////////////////////////////////////////
import "./src/db/configDb.js";
import "dotenv/config";
import __dirname from "./src/__dirname.utils.js";
import { engine } from "express-handlebars";
import express from "express";
import indexRouter from "./src/routes/index.js";
import router from "./src/routes/index.js";
// Crear una instancia de la aplicación Express
const app = express();

// Middleware se utiliza para analizar el cuerpo de las solicitudes HTTP con formato JSON. Permite que tu aplicación web pueda recibir datos en formato JSON en las solicitudes POST o PUT,
app.use(express.json());

// Middleware se utiliza para analizar el cuerpo de las solicitudes HTTP con formato de formulario.Analiza los datos del formulario y los convierte en un objeto JavaScript para utilizar en tu código. El { extended: true } permite el análisis de datos más complejos, como arreglos y objetos anidados.
app.use(express.urlencoded({ extended: true }));

// Middleware de Express utilizado para servir archivos estáticos. Toma como argumento la ruta absoluta al directorio  que contiene los archivos estáticos que deseas servir.
app.use(express.static(__dirname + "/public"));

// handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use("/api", indexRouter);
app.get("/", (req, res) => {
	res.sendFile("index.html", { root: __dirname + "/public" });
});

export default app;