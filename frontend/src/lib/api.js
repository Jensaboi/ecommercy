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
    credentials: "include",
  });

  if (!res.ok) {
    //Need to handle it here
    const err = await res.json();
    throw new Error(`${err.message}`);
  }

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

  if (!res.ok) {
    //Need to handle it here
    throw new Error(`Error: Failed to register user.`);
  }

  const data = await res.json();

  return data;
}

export async function fetchUser() {
  const res = await fetch(`/api/auth/me`, {
    method: "GET",
    credentials: "include", //
  });

  if (!res.ok) {
    //Need to handle it here
    throw new Error(`Error: Failed to get user.`);
  }

  const data = await res.json();

  return data;
}

export async function fetchCategories() {
  const res = await fetch(`/api/products/categories`);

  if (!res.ok) {
    //Need to handle it here
    throw new Error(`Error: Failed to fetch categories user.`);
  }

  const data = await res.json();

  return data;
}

export async function fetchAllProducts(queryString) {
  const res = await fetch(`/api/products${queryString}`);

  if (!res.ok) {
    //Need to handle it here
    throw new Error(`Error: Failed to get products.`);
  }

  const data = await res.json();

  return data;
}

export async function fetchProductsWithCategory(queryString) {
  const res = await fetch(`/api/products`);

  if (!res.ok) {
    //Need to handle it here
    throw new Error(`Error: Failed to fetch products with category.`);
  }

  const data = await res.json();

  return data;
}

export async function fetchProduct(id) {
  const res = await fetch(`/api/products/${id}`);

  if (!res.ok) {
    //Need to handle it here
    throw new Error(`Error: Failed to fetch product.`);
  }

  const data = await res.json();

  return data;
}

export async function fetchProductsWithSearch(queryString, signal) {
  const res = await fetch(`/api/products?search=${queryString}`, { signal });

  if (!res.ok) {
    //Need to handle it here
    throw new Error(`Error: Failed to fetch results.`);
  }

  const data = await res.json();

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

  if (!res.ok) {
    //Need to handle it here
    throw new Error(`Error: Failed to add product to cart.`);
  }

  const data = res.json();

  return data;
}

export async function fetchCart(signal) {
  const res = await fetch("/api/cart", {
    credentials: "include",
    method: "GET",
    signal,
  });

  if (!res.ok) {
    //Need to handle it here
    throw new Error(`Error: Failed to fetch cart items.`);
  }

  const data = res.json();

  return data;
}
