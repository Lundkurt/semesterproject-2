import { getCart } from "./storage.js";

export default function cartCounter() {
  const counterContainer = document.querySelector(".cart-counter");
  let cartLength = getCart().length;

  if (cartLength === 0) {
    cartLength = "";
  }

  counterContainer.innerHTML = cartLength;
}
