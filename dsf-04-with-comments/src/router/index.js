import { Router } from "express";
import carts from "./carts.router.js";
import products from "./products.router.js";
import test from "./test.router.js";

const router = Router();

router.use("/products", products);
router.use("/carts", carts);
router.use("/", test);

export default router;