import { getCart, saveCart } from "../utils/storage.js";
import cartCounter from "./cartCounter.js";

const { pathname } = document.location;

export default function cartHandle() {
  this.classList.toggle("fa-cart-plus");
  this.classList.toggle("fa-shopping-cart");

  const id = this.dataset.id;
  const title = this.dataset.title;
  const price = this.dataset.price;
  const description = this.dataset.description;
  const image = this.dataset.image;

  const currentCart = getCart();

  const productExist = currentCart.find(function (cart) {
    return cart.id === id;
  });
  console.log(productExist);

  if (productExist === undefined) {
    const product = {
      id: id,
      title: title,
      price: price,
      description: description,
      image: image,
    };
    currentCart.push(product);
    saveCart(currentCart);
  } else {
    const newFavs = currentCart.filter((cart) => cart.id !== id);
    saveCart(newFavs);
  }

  cartCounter();
}
