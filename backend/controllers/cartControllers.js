import { getConnection } from "../db/getConnection.js";

export async function getAllItems(req, res) {
  const db = await getConnection();
  const { userId } = req.session;
  let { cart } = req.session;

  try {
    if (!userId) {
      if (cart) {
        let sqlQuery = `SELECT * FROM products`;

        const idsArray = cart.map(item => item.productId);

        idsArray.forEach(item => {
          let clause = "WHERE";

          if (sqlQuery.includes(clause)) clause = "OR";

          sqlQuery += ` ${clause} id = ?`;
        });

        let products = await db.all(sqlQuery, idsArray);

        for (const item of cart) {
          const match = products.find(
            product => parseInt(product.id) === parseInt(item.productId)
          );

          if (!match) {
            return res
              .status(500)
              .json({ error: "Something went wrong, Please try again." });
          }

          match.quantity = item.quantity;
        }

        cart = products;
      }

      return res.status(200).json(cart ?? []);
    }

    const items = await db.all(
      `SELECT C.*, P.price, P.img_url, P.name, P.stock, P.category FROM cart_items C
      LEFT JOIN products P ON P.id = C.product_id
      WHERE user_id = ?
      `,
      [userId]
    );

    res.status(200).json(items);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  } finally {
    await db.close();
  }
}

export async function addItem(req, res) {
  const db = await getConnection();
  const { userId, cart } = req.session;
  const { productId } = req.body;
  const quantity = 1;

  if (!productId)
    return res
      .status(400)
      .json({ error: "Bad request, need an product id to add product" });

  try {
    if (!userId) {
      if (!cart) {
        const product = { productId, quantity };

        req.session.cart = [product];

        return res.status(201).json(product);
      } else {
        let product = cart.find(
          item => parseInt(item.productId) === parseInt(productId)
        );

        if (product) {
          product.quantity++;
        } else {
          product = { productId, quantity };
          cart.push(product);
        }

        return res.status(201).json(product);
      }
    }

    const existingItem = await db.get(
      "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (existingItem) {
      await db.run(
        "UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?",
        [existingItem.id]
      );
      return res.status(200).json({ message: "Added one more to cart." });
    } else {
      await db.run(
        `INSERT INTO cart_items (user_id, product_id, quantity) VALUES ( ?, ? ,? )`,
        [userId, productId, quantity]
      );
      return res.status(201).json({ message: "Item added to cart." });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something went wrong please try again." });
  } finally {
    await db.close();
  }
}

export async function deleteAllItems(req, res) {
  const db = await getConnection();
  const { userId } = res.session;
  try {
    await db.exec("DELETE FROM cart_items WHERE user_id = ?", [userId]);

    res.status(200).json({ message: "All items have been removed from cart." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something went wrong please try again." });
  } finally {
    await db.close();
  }
}

export async function deleteItem(req, res) {
  const db = await getConnection();
  const { userId } = req.session;
  const { productId } = req.params;

  if (!productId)
    return res
      .status(400)
      .json({ error: "Bad request, no product id to delete." });

  try {
    const existingItem = await db.get(
      "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (!existingItem)
      return res.status(400).json({ error: "No item to delete" });

    if (existingItem.quantity >= 2) {
      await db.run(
        "UPDATE cart_items SET quantity = quantity - 1 WHERE id = ?",
        [existingItem.id]
      );

      return res.status(200).json({ message: "Removed one off the items." });
    } else {
      await db.run(
        "DELETE FROM cart_items WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );

      return res.status(200).json({ message: "Item deleted from cart." });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Something went wrong please try again." });
  } finally {
    await db.close();
  }
}
