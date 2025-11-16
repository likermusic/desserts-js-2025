//  <li class="cart-item">
//       <span>${item.name}</span>
//       <span>${total product price}</span>
//       <img class="remove-item" src="assets/icons/icon-remove-item.svg" alt="">
//     </li>

import { getProductById } from "./api";
import { spinner } from "./spinner";

document.querySelector(".product-list").addEventListener("click", async (e) => {
  if (e.target.matches(".add-to-cart, .add-to-cart *")) {
    const id = e.target.closest(".product").dataset.id;
    const btn = e.target.closest(".add-to-cart");
    try {
      btn.disabled = true;
      spinner(".add-to-cart", "afterbegin");
      const product = await getProductById(id);
    } catch (error) {
      printError(error);
    } finally {
      btn.disabled = false;
      document.querySelector("#spinner").remove();
    }
  }
});
