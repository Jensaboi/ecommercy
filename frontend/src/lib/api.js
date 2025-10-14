export async function login({ email, password }) {
  if (!email) {
    throw new Error("Enter your email.");
  }
  if (!password) {
    throw new Error("Enter your password");
  }

  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok)
    throw new Error({
      message: `Error: Failed to login. Status: ${res.status}`,
      status: res.status,
    });

  const data = await res.json();

  return data;
}

export async function register({ name, gender, email, password }) {
  if (!email) {
    throw new Error("Enter your email.");
  }
  if (!password) {
    throw new Error("Enter your password.");
  }
  if (!name) {
    throw new Error("Enter your name.");
  }

  if (!gender) {
    throw new Error("Select gender.");
  }

  const res = await fetch(`/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, gender, email, password }),
  });

  if (!res.ok)
    throw new Error({
      message: `Error: Failed to register user. Status: ${res.status}`,
      status: res.status,
    });

  const data = await res.json();

  return data;
}

export async function fetchUser() {
  const res = await fetch(`/api/auth/me`, {
    method: "GET",
    credentials: "include", //
  });

  if (!res.ok) {
    throw new Error({
      message: `Error: Failed to get user, Status: ${res.status}`,
      status: res.status,
    });
  }

  const data = await res.json();

  return data;
}

export async function fetchCategories() {
  const res = await fetch(`/api/products/categories`);

  if (!res.ok)
    throw new Error(`ERROR: Failed to fetch categories, ${res.status}`);

  const data = await res.json();

  return data;
}

export async function fetchAllProducts(queryString) {
  const res = await fetch(`/api/products${queryString}`);

  if (!res.ok)
    throw new Error(`ERROR: Failed to fetch products, ${res.status}`);

  const data = await res.json();

  return data;
}

export async function fetchProductsWithCategory(queryString) {
  const res = await fetch(`/api/products`);

  if (!res.ok)
    throw new Error(`ERROR: Failed to fetch products, ${res.status}`);

  const data = await res.json();

  return data;
}

export async function fetchProduct(id) {
  const res = await fetch(`/api/products/${id}`);

  if (!res.ok)
    throw new Error(`ERROR: Failed to fetch products, ${res.status}`);

  const data = await res.json();

  return data;
}

export async function fetchProductsWithSearch(queryString, signal) {
  const res = await fetch(`/api/products?search=${queryString}`, { signal });

  if (!res.ok)
    throw new Error(
      `Error: Failed to fetch products search, satus: ${res.status}`
    );

  const data = await res.json();

  return data;
}

export async function addToCart(id) {
  const res = await fetch("/api/cart", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId: id }),
  });

  if (!res.ok)
    throw new Error(`ERROR: Failed to add item to cart, status: ${res.status}`);

  const data = res.json();

  return data;
}

export async function fetchAllCartItems(signal) {
  const res = await fetch("/api/cart", {
    credentials: "include",
    method: "GET",
    signal,
  });

  if (!res.ok)
    throw new Error(`ERROR: Failed to fetch cart items, Status: ${res.status}`);

  const data = res.json();

  return data;
}
