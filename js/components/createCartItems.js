import cartHandle from "../utils/cartHandle.js";

export default function createCartItems(resource) {
  const cartCard = document.createElement("div");
  const cartBody = document.createElement("div");
  const cardFlex = document.createElement("div");
  const divTexts = document.createElement("div");
  const title = document.createElement("h4");
  const priceDiv = document.createElement("div");
  const price = document.createElement("h5");
  const divImage = document.createElement("div");
  const image = document.createElement("img");
  const link = document.createElement("a");
  const divTrash = document.createElement("div");
  const trash = document.createElement("i");

  cartCard.classList.add("card", "rounded-3", "mb-4");
  cartBody.classList.add("card-body", "p-4");
  cardFlex.classList.add(
    "row",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  divImage.classList.add("col-md2", "col-lg-2", "col-xl-2");
  image.classList.add("img-fluid", "rounded-3");
  divTexts.classList.add("col-md-3", "col-lg-3", "col-xl-3");
  title.classList.add("lead", "fw-normal", "mb-2");
  trash.classList.add("fas", "fa-trash", "fa-lg");
  divTrash.classList.add("col-md-1", "col-lg-1", "col-xl-1", "text-end");
  link.classList.add("col-md-3", "col-lg-2", "col-xl-2", "offset-lg-1");
  priceDiv.classList.add("col-md-3", "col-lg-2", "col-xl-2", "offset-lg-1");

  trash.dataset.id = resource.id;
  trash.addEventListener("click", cartHandle);

  divImage.append(image);

  divTexts.append(title);
  divTexts.append(link);

  divTrash.append(trash);

  priceDiv.append(price);

  cardFlex.append(divImage);
  cardFlex.append(divTexts);
  cardFlex.append(priceDiv);
  cardFlex.append(divTrash);

  cartBody.append(cardFlex);

  cartCard.append(cartBody);

  title.innerText = resource.title;
  price.innerText = "$" + resource.price;
  link.href = "/details.html?id=" + resource.id;
  link.innerText = "Watch";
  image.src = resource.image;

  return cartCard;
}
