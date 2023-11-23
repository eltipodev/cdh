import express from "express";
import passport from "passport";
const router = express.Router();

////////////////////
/// Get  Signup ///
//////////////////
router.get("/signup", (req, res) => {
	if (req.session.passport) {

		return res.redirect("/api/user/profile");
	}
	try {

		return res.status(200).render("products", {
			pageTitle: "Signup",
			message: "registros de usuarios",
			user: req.session.user,
			status: "sucess",
			sucess: true,
		});
	} catch (error) {
		return res.status(500).json(
			{
				error: error.message
			});
	}
});

////////////////////
/// Get  Login  ///
//////////////////
router.get("/login", (req, res) => {
	if (req.session.passport) {
		return res.redirect("/api/user/profile");
	}

	try {
		return res.status(200).render("products", {
			pageTitle: "Login",
			message: "Ingresar al sitio",
			user: req.session.user,
			status: "sucess",
			sucess: true,
		});

	} catch (error) {
		return res.status(500).json(
			{
				error: error.message
			});
	}
});

//////////////////////
/// Get  Profile  ///
////////////////////
router.get("/profile", (req, res) => {
	if (!req.session.passport) {
		return res.redirect("/api/user/login");
	}
	try {
		const userObject = {
			firstName: req.user.firstName,
			user: req.user.user,
			lastName: req.user.lastName,
			email: req.user.email
		};

		return res.status(200).render("profile", {
			pageTitle: "Profile",
			message: "Profile User",
			user: userObject,
			status: "sucess",
			sucess: true,
		});

	} catch (error) {
		return res.status(500).json(
			{
				error: error.message
			});
	}
});

////////////////////
/// Get  Logout  ///
//////////////////
router.get("/logout", (req, res) => {

	try {
		req.session.destroy(() => {
			res.redirect("products");
		}
		);

	} catch (error) {
		return res.status(500).json(
			{
				error: error.message
			});
	}
});

/////////////////////
/// Post Signup  ///
///////////////////
router.post("/signup", passport.authenticate("signup", {
	successRedirect: "/api/user/login",
	failureRedirect: "/api/error"
}));

////////////////////
/// Post Login  ///
//////////////////
router.post("/login", passport.authenticate("login", {
	successRedirect: "/api/vista/products",
	failureRedirect: "/api/error"
}));

export default router;