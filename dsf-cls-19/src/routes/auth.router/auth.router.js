import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/github", passport.authenticate("gitHub", { scope: ["user:email"] }));

router.get("/github/callback",
	passport.authenticate("gitHub", {
		successRedirect: "/api/vista/products"
	}));

export default router;