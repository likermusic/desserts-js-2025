import spinnerUrl from "../public/assets/icons/spinner.svg";

export function spinner(selector, position) {
  const el = `<img id="spinner" src="${spinnerUrl}" width="60">`;
  document.querySelector(selector).insertAdjacentHTML(position, el);
}
