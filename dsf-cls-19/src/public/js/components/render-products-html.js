
export const renderProductsHTML = (messages = "") => {
	const productsElement = document.querySelector(".section-products");
	const paginationElement = document.querySelector(".paginate-ctn");

	console.log(messages);

	const productsHtml = messages.payload.docs.map(element => `
      <div class="products-ctn">
        <div class="products-main">
          <img class="button-actions delete" prodId="${element._id}" src="/img/empty-wood-bucket-svgrepo-com.svg" alt="">
          <img class="button-actions add" prodId="${element._id}" src="/img/plus-sign-in-a-circle-svgrepo-com.svg" alt="">
          <div>
            <img src="${element.thumbnails || "/img/imagen_v acio.png"}" alt="imagen de una ${element.title}" class="products-main-img">
            <div class="products-footer-credits"><span>Foto generada con IA</span></div>
            <div class="products-header">
              <div class="products-header-title">${element.title}<span class="products-stock">(${element.stock})</span></div>
            </div>
          </div>
        </div>
        <div class="products-footer">
          <div class="products-footer-price">${element.price}</div>
          <span class="products-footer-vermas"><a href="/api/vista/products/${element._id}">ver mas</a></span>
          <span class="product-id-single carts-id-single-text">${element._id}</span>
        </div>
      </div>

    `);
	console.log("==> message", messages);
	const paginateHtml = `
		<div class="button-pag-prev ${messages.payload.prevPage ? "button-pag--add" : "button-pag--remove"}"></div>
		<ul>${messages.pagination.map(p => `<li class=${messages.payload.page === p ? "button-pag-now" : "paginate-item"} numberPage=${p}>${p}</li>`).join("")}</ul><div class="button-pag-next ${messages.payload.nextPage ? "button-pag--add" : "button-pag--remove"}"></div>`;

	productsElement.innerHTML = productsHtml.join("");

	paginationElement.innerHTML = paginateHtml;
};

// <div class="paginate-ctn">
// 	<div class="button-pag-prev button-pag--remove"></div>
// 	<ul>{{#each pagination}}{{#if (eq ../payload.page this)}}<li class="button-pag-now" numberPage="{{this}}">{{this}}
// 		</li>{{else}}
// 		<li class="paginate-item" numberPage="{{this}}">{{this}}</li>{{/if}}{{/each}}
// 	</ul>
// 	<div class="button-pag-next button-pag--add"></div>
// </div>