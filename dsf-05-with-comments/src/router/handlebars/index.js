import { Router } from "express";
import carts from "./carts.router.js";
import home from "./home.router.js";
import products from "./products.router.js";
import test from "./test.router.js";

const router = Router();

// Dividimos nuestra rutas
router.use("/products", products);
router.use("/carts", carts);
router.use("/home", home);
router.use("/test", test);

export default router;
