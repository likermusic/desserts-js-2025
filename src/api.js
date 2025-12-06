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
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 2000);
  // });
  const resp = await fetch(`${apiUrl}/products/${id}`);
  if (!resp.ok) {
    throw new Error("Ошибка добавления товара");
  }
  const data = await resp.json();
  return data;
}

export async function getProductFromCartById(id) {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 1000);
  // });
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

async function addProductToCartFirst(id) {
  const resp = await fetch(`${apiUrl}/cart`, {
    method: "POST",
    "Content-Type": "application/json",
    body: JSON.stringify({ id, count: 1 }),
  });

  if (!resp.ok) {
    throw new Error("Ошибка добавления товара");
  }
}

async function updateCartProductCount(id, count) {
  const resp = await fetch(`${apiUrl}/cart/${id}`, {
    method: "PATCH",
    "Content-Type": "application/json",
    body: JSON.stringify({ count }),
  });

  if (!resp.ok) {
    throw new Error("Ошибка выполнения операции");
  }
}

//REFACTOR
export async function addProductToCart(id) {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //   }, 1000);
  // });
  const data = await getProductById(id);

  const productInCart = await getProductFromCartById(id);

  if (!productInCart) {
    await addProductToCartFirst(id);
    return { ...data, count: 1 };
  } else {
    const count = productInCart.count;
    await updateCartProductCount(id, count + 1);
    return { ...data, count: count + 1 };
  }
}

export async function removeProductFromCart(id) {
  // const product = await getProductFromCartById(id);
  // const { price } = await getProductById(id);

  const [product, { price }] = await Promise.all([
    getProductFromCartById(id),
    getProductById(id),
  ]).then((data) => data);

  if (product.count === 1) {
    const resp = await fetch(`${apiUrl}/cart/${id}`, {
      method: "DELETE",
    });

    if (!resp.ok) {
      throw new Error("Ошибка удаления товара");
    }
  } else if (product.count > 1) {
    await updateCartProductCount(id, product.count - 1);
  }

  return {
    count: product.count - 1,
    price,
  };
}
