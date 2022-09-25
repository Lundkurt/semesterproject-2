import createHeader from "./components/createHeader.js";
import displayMessage from "./components/displayMessage.js";
import { baseUrl } from "./settings/links.js";
import deleteArticle from "./utils/deleteProduct.js";
import { getToken } from "./utils/storage.js";

const message = document.querySelector(".display-message");

const token = getToken();

if (!token) {
  location.href = "/";
}

createHeader();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
console.log(id);

if (!id) {
  document.location.href = "/";
}

const productUrl = baseUrl + "products/" + id;

const thumbnail = document.querySelector(".img-thumbnail");

const form = document.querySelector("form");
const idInput = document.querySelector("#id");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const img = document.querySelector("#uploadImage");
const description = document.querySelector("#description");
const featured = document.querySelector("#featuredToggle");
const h1 = document.querySelector("h1");

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();
    console.log(details);

    if (details.featured) {
      featured.value = 1;
    }

    idInput.value = details.id;
    title.value = details.title;
    price.value = details.price;
    description.value = details.description;
    thumbnail.src = details.image.url;

    h1.innerHTML = "Edit:" + " " + details.title;

    deleteArticle(details.id);
  } catch (error) {
    console.warn(error);
  }
})();

form.addEventListener("submit", editFormSubmit);

function editFormSubmit(event) {
  event.preventDefault();

  message.innerHTML = "";

  const idValue = idInput.value;
  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value.trim());
  const descriptionValue = description.value.trim();
  const featuredValue = featured.value;
  const image = img.files[0];
  console.log(featured);
  console.log(featured.value);

  console.log(priceValue);

  if (titleValue.length < 5 || isNaN(priceValue) || descriptionValue < 15) {
    return displayMessage(
      "error",
      "Please supply proper values",
      ".display-message"
    );
  }

  updateProduct(
    idValue,
    titleValue,
    priceValue,
    descriptionValue,
    featuredValue,
    image
  );
}

async function updateProduct(id, title, price, description, featured, image) {
  const formData = new FormData();

  if (parseFloat(featured) === 1) {
    featured = true;
  } else if (featured === "No") {
    featured = false;
  }
  console.log(featured);
  const url = baseUrl + "products/" + id;

  const data = JSON.stringify({
    id: id,
    title: title,
    price: price,
    description: description,
    featured: featured,
  });

  console.log(image);

  formData.append("files.image", image);
  formData.append("data", data);
  console.log(formData);

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("success", "Product updated", ".display-message");
    }

    if (json.error) {
      displayMessage("error", json.message, ".display-message");
    }
  } catch (error) {
    displayMessage("error", error, ".display-message");
  }
}
