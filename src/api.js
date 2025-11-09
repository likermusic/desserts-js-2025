export async function getProducts() {
  const resp = await fetch("http://localhost:3000/products");
  if (!resp.ok) {
    throw new Error("Ошибка получения товаров");
  }
  const data = await resp.json();
  return data;
}
