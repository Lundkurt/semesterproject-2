import createHeader from "./components/createHeader.js";
import productCard from "./components/productCard.js";
import { baseUrl } from "./settings/links.js";
import filterProducts from "./utils/filterProducts.js";

createHeader();

const productContainer = document.querySelector(".product-container");

(async function fetchProducts() {
  try {
    productContainer.innerHTML = "";
    const response = await fetch(baseUrl + "products");
    const data = await response.json();
    const appendList = data.map(productCard);
    productContainer.append(...appendList);
    filterProducts(data);
    console.log(data);
  } catch (error) {
    console.warn(error);
  }
})();
