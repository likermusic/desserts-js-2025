import { getProducts } from "./api";
import { printError } from "./error";

// Добавить Loader

async function getProductsWrapper() {
  try {
    const products = await getProducts();
    if (products.length > 0) {
      renderProducts(products);
    } else {
      throw new Error("Не удолось получить товары");
    }
  } catch (error) {
    document.body.insertAdjacentHTML("beforeend", printError(error.message));
    setTimeout(() => {
      document.querySelector(".error-message").remove();
    }, 3000);
  }
}

function renderProducts(products) {
  const productsMarkup = products.map(
    (product) =>
      `
    <div class="product">
      <img src="${product.image.desktop}" alt="${product.name}">
      <h2>${product.name}</h2>
      <p>$${product.price}</p>
      <button data-id="${product.id}"> <img src="/assets/icons/icon-add-to-cart.svg" class="add-to-cart">
        <span>Add to Cart</span></button>
    </div>
    `
  );

  document
    .querySelector(".product-list")
    .insertAdjacentHTML("beforeend", productsMarkup.join(""));
}

getProductsWrapper();
