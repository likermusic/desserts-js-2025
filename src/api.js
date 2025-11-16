const apiUrl = "http://localhost:3000";

export async function getProducts() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });

  const resp = await fetch(`${apiUrl}/products`);
  if (!resp.ok) {
    throw new Error("Ошибка получения товаров");
  }
  const data = await resp.json();
  return data;
}

export async function getProductById(id) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
  const resp = await fetch(`${apiUrl}/products/${id}`);
  if (!resp.ok) {
    throw new Error("Ошибка добавления товара");
  }
  const data = await resp.json();
  return data;
}
