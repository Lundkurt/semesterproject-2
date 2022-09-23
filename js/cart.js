import createCartItems from "./components/createCartItems.js";
import createHeader from "./components/createHeader.js";
import displayMessage from "./components/displayMessage.js";
import { getCart } from "./utils/storage.js";

const cartContainer = document.querySelector(".cart-container");

createHeader();

(function createCartList() {
  const cart = getCart();
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    displayMessage("", "Add some products first", ".cart-container");
  }

  const appendlist = cart.map(createCartItems);
  cartContainer.append(...appendlist);
})();
