import { getCart } from "../utils/storage.js";
import createCartItems from "./createCartItems.js";
import displayMessage from "./displayMessage.js";

const cartContainer = document.querySelector(".cart-container");
const cartTotal = document.querySelector(".cart-total");

export default function createCartList() {
  let total = 0;
  const cart = getCart();
  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    displayMessage("", "Add some products first", ".cart-container");
  }

  const appendlist = cart.map(createCartItems);
  cartContainer.append(...appendlist);

  cart.forEach((element) => {
    total += parseInt(element.price);
    cartTotal.innerHTML = "$" + total;
    console.log(total);
  });
}
