const apiUrl = "http://localhost:3000";

export async function getProducts() {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
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
    }, 500);
  });
  const resp = await fetch(`${apiUrl}/products/${id}`);
  if (!resp.ok) {
    throw new Error("Ошибка добавления товара");
  }
  const data = await resp.json();
  return data;
}

export async function getProductFromCartById(id) {
  const resp = await fetch(`${apiUrl}/cart/${id}`);
  // 200 - {id:1,count:2}
  // 404

  if (!resp.ok) {
    return null;
  } else {
    const data = await resp.json();
    return data;
  }
}

//REFACTOR
export async function addProductToCart(id) {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const data = await getProductById(id);

  const productInCart = await getProductFromCartById(id);

  if (!productInCart) {
    const resp = await fetch(`${apiUrl}/cart`, {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({ id, count: 1 }),
    });

    if (!resp.ok) {
      throw new Error("Ошибка добавления товара");
    }

    return data;
  } else {
    const resp = await fetch(`${apiUrl}/cart/${id}`, {
      method: "PATCH",
      "Content-Type": "application/json",
      body: JSON.stringify({ count: 3 }),
    });

    if (!resp.ok) {
      throw new Error("Ошибка добавления товара");
    }

    return data;
  }
}
