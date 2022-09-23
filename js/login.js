import createHeader from "./components/createHeader.js";
import { baseUrl } from "./settings/links.js";
import { checkLength } from "./utils/inputValidation.js";
import displayMessage from "./components/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";

createHeader();

const form = document.querySelector("form");
form.addEventListener("submit", formValidate);
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".display-message");

const formState = {
  usernameInput: {
    isValid: false,
  },
  passwordInput: {
    isValid: false,
  },
};

function formValidate(event) {
  event.preventDefault();

  message.innerHTML = "";

  if (checkLength(username.value, 0)) {
    formState.usernameInput.isValid = true;
  }
  if (checkLength(password.value, 5)) {
    formState.passwordInput.isValid = true;
  }

  const userValue = username.value.toLowerCase();
  const passValue = password.value;

  if (!formState.usernameInput.isValid || !formState.passwordInput.isValid) {
    displayMessage("", "Some input are invalid", ".display-message");
  } else {
    login(userValue, passValue);
  }
}

async function login(username, password) {
  const url = baseUrl + "auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: { "Content-type": "application/json" },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      saveToken(json.jwt);
      saveUser(json.user);
      createHeader();

      location.href = "/user.html";
    }

    console.log(json);

    if (json.error) {
      displayMessage(
        "error",
        "Wrong username or password!",
        ".display-message"
      );
    }
  } catch (error) {
    console.log(error);
  }
}
