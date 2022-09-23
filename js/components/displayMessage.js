export default function displayMessage(type, message, targetElement) {
  const display = document.querySelector(targetElement);

  display.innerHTML = `<span class="message ${type}">${message}</span>`;
}
