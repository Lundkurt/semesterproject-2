import createHeader from "./components/createHeader.js";
import { baseUrl } from "./settings/links.js";
import cartCounter from "./utils/cartCounter.js";
import cartHandle from "./utils/cartHandle.js";
import { getCart, saveCart } from "./utils/storage.js";

createHeader();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const productUrl = baseUrl + "products/" + id;
const cartAdded = getCart();

const title = document.querySelector("h1");
const price = document.querySelector("h3");
const description = document.querySelector(".description");
const image = document.querySelector("#product-img");
const cartAdd = document.querySelector("#addToCart");

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();
    console.log(details);
    const alreadyAdded = cartAdded.find(function (cart) {
      return parseInt(cart.id) === details.id;
    });
    cartAdd.innerHTML = "Add to Cart";
    if (alreadyAdded) {
      cartAdd.innerHTML = "Remove from Cart";
    }

    cartAdd.dataset.id = details.id;
    cartAdd.dataset.title = details.title;
    cartAdd.dataset.price = details.price;
    cartAdd.dataset.description = details.description;
    cartAdd.dataset.image = details.image.url;
    cartAdd.addEventListener("click", cartButton);

    title.innerHTML = details.title;
    price.innerHTML = "$" + details.price;
    description.innerHTML = details.description;
    image.src = details.image.url;
    return cartAdd;
  } catch (error) {
    console.warn(error);
  }
})();

function cartButton() {
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
    cartAdd.innerHTML = "Remove from Cart";
  } else {
    const newFavs = currentCart.filter((cart) => cart.id !== id);
    saveCart(newFavs);
    cartAdd.innerHTML = "Add to Cart";
  }

  cartCounter();
}
