import { baseUrl } from "../settings/links.js";
import { getToken } from "./storage.js";

export default function deleteArticle(id) {
  const deleteContainer = document.querySelector(".delete-container");

  deleteContainer.innerHTML = `<button type="button" class="btn btn-danger mb-3" id="delete">Delete</button>`;

  const deleteButton = document.querySelector("button#delete");

  deleteButton.onclick = async function () {
    const confirmation = confirm(
      "Are you sure you want to delete this product?"
    );
    console.log(confirmation);

    if (confirmation) {
      const url = baseUrl + "products/" + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "/";

        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  };
}
