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
