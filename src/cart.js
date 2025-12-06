import {
  addProductToCart,
  getProductById,
  getProducts,
  removeProductFromCart,
} from "./api";
import { printError } from "./error";
import { spinner } from "./spinner";

let cartCount = 0;
let orderTotal = 0;

function calcCartCount(isAdd = true) {
  if (isAdd) {
    cartCount++;
  } else {
    cartCount--;
  }
  document.querySelector(".cart-count").textContent = cartCount;
}

function calcOrderTotal(productPrice, isAdd = true) {
  if (isAdd) {
    orderTotal += productPrice;
  } else {
    orderTotal -= productPrice;
  }
  document.querySelector(".total-price").textContent = orderTotal.toFixed(2);
}

document.querySelector(".product-list").addEventListener("click", async (e) => {
  if (e.target.matches(".add-to-cart, .add-to-cart *")) {
    const id = e.target.closest(".product").dataset.id;
    const btn = e.target.closest(".add-to-cart");
    try {
      btn.disabled = true;
      spinner(`.product[data-id="${id}"] .add-to-cart`, "afterbegin", 20);
      const product = await addProductToCart(id);
      if (product.count === 1) {
        const productMarkup = `
          <li class="cart-item" data-id="${product.id}">
            <span>${product.name}</span>
            <span>x<span class="count">${product.count}</span></span>
            <span>$${product.price}</span>
            <img class="remove-item" src="assets/icons/icon-remove-item.svg" alt="">
          </li>
          `;

        document
          .querySelector(".cart-items")
          .insertAdjacentHTML("beforeend", productMarkup);
      } else if (product.count > 1) {
        document.querySelector(
          `.cart-item[data-id="${id}"] .count`
        ).textContent = product.count;
      }

      calcOrderTotal(product.price);
    } catch (error) {
      printError(error);
    } finally {
      calcCartCount();
      document.querySelector(".confirm-order").disabled = false;
      btn.disabled = false;
      document.querySelector("#spinner").remove();
    }
  }
});

document.querySelector(".cart-items").addEventListener("click", async (e) => {
  if (e.target.matches(".remove-item")) {
    const id = e.target.closest(".cart-item").dataset.id;
    try {
      const { count: productCount, price } = await removeProductFromCart(id);
      if (productCount === 0) {
        //remove
        e.target.closest(".cart-item").remove();
      } else {
        //update
        e.target.closest(".cart-item").querySelector(".count").textContent =
          productCount;
      }
      calcCartCount(false);
      calcOrderTotal(price, false);
    } catch (error) {
      printError(error);
    }
  }
});

async function loadProductsFromCart() {
  const cartProducts = await getProducts("cart"); //[{id, count},]

  // const r = await Promise.all(cartProducts.map((el) => getProductById(el.id)));

  //const products = []; // [{id, name, cat, pr,im}]
  for (let i = 0; i < cartProducts.length; i++) {
    const product = await getProductById(cartProducts[i].id);
    throw new Error();
    cartProducts[i].name = product.name;
    cartProducts[i].price = product.price;
  }

  return cartProducts;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const cartProducts = await loadProductsFromCart();
    //отрисовать товары
    //пересчитать count, price
    //оформить заказ
  } catch (error) {
    printError({ message: "Ошибка получения товаров из корзины" });
  }
});
