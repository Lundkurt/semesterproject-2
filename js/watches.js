import createHeader from "./components/createHeader.js";
import productCard from "./components/productCard.js";
import { baseUrl } from "./settings/links.js";

createHeader();

const productContainer = document.querySelector(".product-container");

async function fetchProducts() {
  try {
    const response = await fetch(baseUrl + "products");
    const data = await response.json();
    const appendList = data.map(productCard);
    productContainer.append(...appendList);
  } catch (error) {
    console.warn(error);
  }
}

fetchProducts();
