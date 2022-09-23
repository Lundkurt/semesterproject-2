const tokenKey = "token";
const userKey = "user";
const cart = "cart";

export function saveToken(token) {
  saveToStorage(tokenKey, token);
}

export function getToken() {
  return getFromStorage(tokenKey);
}

export function saveUser(user) {
  saveToStorage(userKey, user);
}

export function getUsername() {
  const user = getFromStorage(userKey);

  if (user) {
    return user.username;
  }

  return null;
}

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key) {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value);
}

export function clearStorage() {
  localStorage.clear();
}

export function clearCart() {
  localStorage.removeItem(cart);
}

export function clearUser() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}

export function getCart() {
  const cartItems = localStorage.getItem(cart);

  if (cartItems === null) {
    return [];
  } else {
    return JSON.parse(cartItems);
  }
}

export function saveCart(value) {
  localStorage.setItem(cart, JSON.stringify(value));
}
