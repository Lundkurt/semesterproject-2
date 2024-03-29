import createHeader from "./components/createHeader.js";
import productCard from "./components/productCard.js";
import { baseUrl } from "./settings/links.js";

createHeader();

const featuredContainer = document.querySelector(".featured-container");
const heroImg = document.querySelector(".hero-img");

function fetchHero() {
  try {
    featuredContainer.innerHTML = "";
    // const response = await fetch(baseUrl + "home");
    // const hero = await response.json();
    heroImg.style.backgroundImage = `url("../images/carousel-3.jpg")`;
  } catch (error) {
    console.warn(error);
  }
}

fetchHero();

async function fetchFeatured() {
  try {
    const response = await fetch(baseUrl + "?limit=4");
    const data = await response.json();
    console.log(data);
    const appendList = data.map(productCard);
    featuredContainer.append(...appendList);
  } catch (error) {
    console.warn(error);
  }
}
fetchFeatured();
