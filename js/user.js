import createHeader from "./components/createHeader.js";
import { clearUser, getToken, getUsername } from "./utils/storage.js";
import displayMessage from "./components/displayMessage.js";
import { baseUrl } from "./settings/links.js";

const h1 = document.querySelector("h1");

const token = getToken();

if (!token) {
  location.href = "/login.html";
}

const username = getUsername();

document.title = `X Admin | ${username}`;
h1.innerHTML = `Welcome ${username}`;

createHeader();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const img = document.querySelector("#uploadImage");
const description = document.querySelector("#description");
const featuredToggle = document.querySelector("#featuredToggle");
const message = document.querySelector(".display-message");

form.addEventListener("submit", productFormSubmit);

function productFormSubmit(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value.trim());
  const descriptionValue = description.value.trim();
  const featuredValue = featuredToggle.value;
  const image = img.files[0];

  console.log(priceValue);

  if (titleValue.length < 5 || isNaN(priceValue) || descriptionValue < 15) {
    return displayMessage(
      "error",
      "Please supply proper values",
      ".display-message"
    );
  }

  postProduct(titleValue, priceValue, descriptionValue, featuredValue, image);
}

async function postProduct(title, price, description, featured, image) {
  const formData = new FormData();

  console.log(featured);
  if (parseFloat(featured.value) === 1) {
    return true;
  }

  const url = baseUrl + "products";

  const data = JSON.stringify({
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
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("success", "Product posted", ".display-message");
    }

    if (json.error) {
      displayMessage("error", json.message, ".display-message");
    }
  } catch (error) {
    displayMessage("error", error, ".display-message");
  }
}

const logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", logout);

function logout() {
  clearUser();
  location.href = "/";
}
