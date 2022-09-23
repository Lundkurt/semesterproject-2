import { getUsername } from "../utils/storage.js";

export default function createHeader() {
  const { pathname } = document.location;

  const nav = document.querySelector("nav");

  const userName = getUsername();

  let profileBtn = `<a class="btn" href="/login.html">Log in</a>`;

  if (userName) {
    profileBtn = `<a class="btn" href="/user.html">Profile: ${userName}</a>`;
  }

  nav.innerHTML = `<div class="container-fluid">
    <a class="navbar-brand text-uppercase" href="/">Watchbase</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/index.html">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/watches.html">Watches</a>
        </li>
        
        
      </ul>
      <a href="/cart.html"><i class="fa fa-shopping-cart"></i></a>
      ${profileBtn}
    </div>
  </div>`;
}
