import { getConnection } from "./getConnection.js";

async function logTable() {
  const db = await getConnection();
  try {
    const products = await db.all("SELECT * FROM products");
    console.log("products");
    console.table(products);

    const users = await db.all("SELECT * FROM users");
    console.log("Users");
    console.table(users);

    const cartItems = await db.all("SELECT * FROM cart_items");
    console.log("cart_items");
    console.table(cartItems);

    const wishlist = await db.all("SELECT * FROM wishlist");
    console.log("wishlist");
    console.table(wishlist);

    const categories = await db.all("SELECT * FROM categories");
    console.log("categories");
    console.table(categories);

    const subCategories = await db.all("SELECT * FROM sub_categories");
    console.log("sub_categories");
    console.table(subCategories);
  } catch (err) {
    console.log(err);
  } finally {
    await db.close();
  }
}
logTable();
