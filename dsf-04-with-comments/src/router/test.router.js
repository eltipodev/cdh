import { Router } from "express";

const router = Router();

///  Ruta /api                            ///
////////////////////////////////////////////

router.get("", (req, res) => {
	try {
		// Respuesta de estado 'aceptado' (202)
		res.status(202).json({
			health: "up",
			success: true
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			message: "😪 Ocurrió un error interno en el servidor.",
			error: error.message
		});
	}
});

export default router;