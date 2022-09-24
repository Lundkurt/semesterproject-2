import { getCart, getUsername } from "../utils/storage.js";
import cartHandle from "../utils/cartHandle.js";

const cartAdded = getCart();
const username = getUsername();

export default function productCard(resource) {
  let iconClass = "fa-cart-plus";
  const alreadyAdded = cartAdded.find(function (cart) {
    return parseInt(cart.id) === resource.id;
  });

  if (alreadyAdded) {
    iconClass = "fa-shopping-cart";
  }

  const card = document.createElement("div");
  const image = document.createElement("img");
  const cardBody = document.createElement("div");
  const title = document.createElement("h5");
  const bottomLine = document.createElement("div");
  const price = document.createElement("h4");
  const link = document.createElement("a");
  const cart = document.createElement("i");
  const edit = document.createElement("a");

  card.classList.add("card");
  image.classList.add("card-img-top");
  title.classList.add("card-title");
  price.classList.add("card-text");
  bottomLine.classList.add(
    "d-flex",
    "flex-row",
    "align-items-center",
    "justify-content-evenly"
  );
  link.classList.add("btn", "btn-light");
  cardBody.classList.add("card-body");
  edit.classList.add("edit-btn", "btn", "btn-info");

  cart.classList.add("fa", iconClass);
  cart.dataset.id = resource.id;
  cart.dataset.title = resource.title;
  cart.dataset.price = resource.price;
  cart.dataset.description = resource.description;
  cart.dataset.image = resource.image.url;
  cart.addEventListener("click", cartHandle);

  image.src = resource.image.url;
  title.innerText = resource.title;
  price.innerText = resource.price + "$";
  link.href = `details.html?id=${resource.id}`;
  link.innerText = "View";
  edit.href = `/edit.html?id=${resource.id}`;
  edit.innerText = "Edit";

  cardBody.append(title);
  cardBody.append(bottomLine);
  bottomLine.append(price);
  bottomLine.append(cart);
  bottomLine.append(link);

  card.append(image);
  card.append(cardBody);
  if (username) {
    cardBody.append(edit);
  }

  return card;
}
