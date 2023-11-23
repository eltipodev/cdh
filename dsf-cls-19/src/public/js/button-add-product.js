
export const buttonAddProduct = (cid, pid) => {

	if (cid) {
		fetch(`/api/carts/${cid}/products/${pid}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then(response => response.json())
			.then(data => {

				// eslint-disable-next-line no-undef
				Swal.fire({
					title: data.pageTitle,
					text: data.message,
					icon: "success",
					confirmButtonText: "Cool"
				});
			})
			.catch(error => {
				console.error("Error al obtener datos:", error);
			});
	} else {
		// eslint-disable-next-line no-undef
		Swal.fire({
			title: "Carrito",
			text: "Primero Seleccione un Carrito",
			icon: "error",
			confirmButtonText: "Cool"
		});
	}

};

