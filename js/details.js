import createHeader from "./components/createHeader.js";
import { baseUrl } from "./settings/links.js";
import cartHandle from "./utils/cartHandle.js";
import { getCart } from "./utils/storage.js";

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
const cartAdd = document.querySelector("#shopping-cart");

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();
    console.log(details);
    let iconClass = "fa-cart-plus";
    const alreadyAdded = cartAdded.find(function (cart) {
      return parseInt(cart.id) === details.id;
    });

    if (alreadyAdded) {
      iconClass = "fa-shopping-cart";
    }

    cartAdd.classList.add("fa", iconClass);
    cartAdd.dataset.id = details.id;
    cartAdd.dataset.title = details.title;
    cartAdd.dataset.price = details.price;
    cartAdd.dataset.description = details.description;
    cartAdd.dataset.image = details.image.url;
    cartAdd.addEventListener("click", cartHandle);

    title.innerHTML = details.title;
    price.innerHTML = "$" + details.price;
    description.innerHTML = details.description;
    image.src = details.image.url;
  } catch (error) {
    console.warn(error);
  }
})();
