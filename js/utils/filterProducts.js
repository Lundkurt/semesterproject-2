import productCard from "../components/productCard.js";

const filter = document.querySelector("#filter");
const productContainer = document.querySelector(".product-container");

export default function filterProducts(resource) {
  filter.onkeyup = function (event) {
    productContainer.innerHTML = "";
    const filterValue = event.target.value.trim().toLowerCase();

    const filteredProducts = resource.filter(function (prod) {
      if (
        prod.title.toLowerCase().includes(filterValue) ||
        prod.description.toLowerCase().includes(filterValue)
      ) {
        return true;
      }
    });
    const appendList = filteredProducts.map(productCard);
    productContainer.append(...appendList);
  };
}
