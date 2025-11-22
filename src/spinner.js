import spinnerUrl from "../public/assets/icons/spinner.svg";

export function spinner(selector, position, size = 60) {
  const el = `<img id="spinner" src="${spinnerUrl}" width="${size}">`;
  document.querySelector(selector).insertAdjacentHTML(position, el);
}
