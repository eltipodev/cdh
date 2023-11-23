/* eslint-disable no-unused-vars */

//////////////////////////////////////////////
///  importaciones                        ///
////////////////////////////////////////////

import "dotenv/config";
import { Server } from "socket.io";
import __dirname from "./dirname.utils.js";
import { engine } from "express-handlebars";
import express from "express";
import productManager from "./ProductManager.js";
import router from "./router/proyecto/index.js";
import routerHandlebars from "./router/handlebars/index.js";

// Crear una instancia de la aplicación Express
const app = express();

// handlebars
app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Middleware se utiliza para analizar el cuerpo de las solicitudes HTTP con formato JSON. Permite que tu aplicación web pueda recibir datos en formato JSON en las solicitudes POST o PUT,
app.use(express.json());

// Middleware se utiliza para analizar el cuerpo de las solicitudes HTTP con formato de formulario.Analiza los datos del formulario y los convierte en un objeto JavaScript para utilizar en tu código. El { extended: true } permite el análisis de datos más complejos, como arreglos y objetos anidados.
app.use(express.urlencoded({ extended: true }));

// Middleware de Express utilizado para servir archivos estáticos. Toma como argumento la ruta absoluta al directorio  que contiene los archivos estáticos que deseas servir.
app.use(express.static(__dirname + "/public"));

// Importamos el index de nuestro controlador de rutas
app.use("/api", router);
app.use("/api/handlebars", routerHandlebars);
app.get("/", (req, res) => {
	res.sendFile("index.html", { root: __dirname });
});

// Definir el puerto en el que se ejecutará el servidor
const PORT = process.env.PORT || 3000;

//////////////////////////////////////////////
/// Iniciar servidor Express con Socket.io///
////////////////////////////////////////////

// Iniciar el servidor Express y escuchar en el puerto especificado

const httpServer = app.listen(PORT, () => {
	console.info(`Example app listening on port ${PORT} !`);
});

const socketServer = new Server(httpServer);

// evento connection
socketServer.on("connection", socket => {
	// console.log("socket", socket);
	// id de los clientes conectos
	console.log(`Cliente conectado ${socket.id}`);

	socket.on("disconnect", () => {
		console.log(`Cliente Desconectado ${socket.id}`);
	});
	socket.emit("Buenas", "Buenas");

	// socket.on("price", (value) => { console.log(value); });
	// socket.on("Cliente", message => { console.log(message); });

	socket.on("productByDelete", async (prodId) => {
		try {
			const productDelete = await productManager.deleteProduct(prodId);
			const updateProduct = await productManager.getProducts();

			if (productDelete === null) {
				socket.emit("productAddError", "Hubo un error");
			} else {

				socket.emit("productByDelete", updateProduct);
			}

		} catch (error) {
			console.error(error);
			socket.emit("productAddError", { error: error.message });
		}
	});

	socket.on("addProduct", async (productData) => {
		try {
			const newProduct = await productManager.addProduct(productData);
			const updateProduct = await productManager.getProducts();

			if (newProduct === null || newProduct === "codigo ya existe" || newProduct === "Faltan propiedades obligatorias o tienen tipos incorrectos") {
				socket.emit("productAddError", newProduct);
			} else {

				socket.emit("productAdded", updateProduct);
			}

		} catch (error) {
			console.error(error);
			socket.emit("productAddError", { error: error.message });
		}
	});

});

export default socketServer;