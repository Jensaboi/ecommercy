export async function login({ email, password }) {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message || "Something went wrong."}`);
  }

  return data;
}

export async function register({ name, gender, email, password }) {
  const res = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, gender, email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message || "Something went wrong."}`);
  }

  return data;
}

export async function fetchUser() {
  const res = await fetch(`/api/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message || "Something went wrong."}`);
  }

  return data;
}

export async function fetchCategories() {
  const res = await fetch(`/api/products/categories`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message || "Something went wrong."}`);
  }

  return data;
}

export async function fetchAllProducts(queryString) {
  const res = await fetch(`/api/products${queryString}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message || "Something went wrong."}`);
  }

  return data;
}

export async function fetchProductsWithCategory(queryString) {
  const res = await fetch(`/api/products`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message || "Something went wrong."}`);
  }

  return data;
}

export async function fetchProduct(id) {
  const res = await fetch(`/api/products/${id}`);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message || "Something went wrong."}`);
  }

  return data;
}

export async function fetchProductsWithSearch(queryString, signal) {
  const res = await fetch(`/api/products?search=${queryString}`, { signal });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message || "Something went wrong."}`);
  }

  return data;
}

export async function addToCart(productId) {
  const res = await fetch("/api/cart", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  let data = await res.json();

  if (!res.ok) {
    throw new Error(`${data.message || "Something went wrong."}`);
  }

  data = data.map(item => ({
    ...item,
    attributes: JSON.parse(item.attributes),
    images: JSON.parse(item.images),
  }));

  return data;
}

export async function fetchCart() {
  const res = await fetch("/api/cart", {
    credentials: "include",
    method: "GET",
    cache: "no-store",
  });

  let data = await res.json();

  if (!res.ok) {
    throw new Error(
      `${data.message || "Something went wrong fetching the cart, try again."}`
    );
  }

  data = data.map(item => ({
    ...item,
    attributes: JSON.parse(item.attributes),
    images: JSON.parse(item.images),
  }));

  return data;
}

export async function deleteCartItem(productId) {
  const res = await fetch(`/api/cart/${productId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Something went wrong, Please try again.");
  }

  return data;
}

export async function updateCartItemQuantity({ productId, changeAmount }) {
  const res = await fetch(`/api/cart/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ changeAmount }),
  });

  let data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Something went wrong, please try again.");
  }

  data = data.map(item => ({
    ...item,
    attributes: JSON.parse(item.attributes),
    images: JSON.parse(item.images),
  }));

  return data;
}

export async function deleteCart() {
  const res = await fetch("/api/cart", {
    method: "DELETE",
    credentials: "include",
  });

  console.log("getting called");
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message ?? "Something went wrong deleting cart.");
  }

  return data;
}

export async function logout() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.message ?? "Something went wrong login out, please try again."
    );
  }

  return data;
}

export async function fetchSessionStatus(sessionId) {
  const res = await fetch(
    `/api/checkout/session-status?session_id=${sessionId}`
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.message ?? "Something went wrong with getting the payment session."
    );
  }

  return data;
}

export async function createCheckoutSession(cart) {
  const res = await fetch("/api/checkout/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.message ?? "Something went wrong creating an checkout session."
    );
  }

  if (!data?.clientSecret) {
    throw new Error("No avaible Client Secret for this session.");
  }

  return data;
}
