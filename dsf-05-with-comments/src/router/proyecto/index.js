import { Router } from "express";
import carts from "../handlebars/carts.router.js";
import products from "../handlebars/products.router.js";
import test from "../handlebars/test.router.js";

const router = Router();

// Dividimos nuestra rutas
router.use("/products", products);
router.use("/carts", carts);
router.use("/test", test);

export default router;
