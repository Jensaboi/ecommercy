import { getConnection } from "../db/getConnection.js";
import { generateSqlQueryWithIdsArray } from "../lib/utility.js";

export async function getAllItems(req, res) {
  const db = await getConnection();
  const { userId } = req.session;
  let { cart } = req.session;

  try {
    if (!userId) {
      if (cart) {
        try {
          const productIdsArray = cart.map(item => item.productId);

          const sqlQuery = generateSqlQueryWithIdsArray(
            productIdsArray,
            "products"
          );

          let products = await db.all(sqlQuery, productIdsArray);

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
          return res.status(200).json(cart ?? []);
        } catch (err) {
          console.log("Failed to get session cart: " + err.message);
          return res
            .status(500)
            .json({ error: "Something went wrong, Please try again." });
        }
      }
    }

    if (cart) {
      const currentCartItemsInDb = await db.all(
        `SELECT P.name, P.stock, P.images, P.description, P.price, P.id AS product_id , CI.id AS cart_id, CI.quantity FROM products P
            LEFT JOIN cart_items CI ON P.id = CI.product_id
            LEFT JOIN users U ON CI.user_id = U.id
          WHERE CI.user_id = ?
      `,
        [userId]
      );
      try {
        await db.run("BEGIN TRANSACTION");

        //loop over session cart
        for (const cartItem of cart) {
          try {
            const match = currentCartItemsInDb.find(
              item => item.product_id === cartItem.productId
            );
            //check for a match.
            if (!match) {
              await db.run(
                `INSERT INTO cart_items
                ( user_id, product_id, quantity)
                VALUES (? , ?, ?)`,
                [userId, cartItem.productId, cartItem.quantity]
              );
            } else {
              await db.run(
                `
                UPDATE cart_items SET
                quantity = ?
                WHERE user_id = ?
                AND product_id = ?
                `,
                [cartItem.quantity, userId, cartItem.productId]
              );
            }
          } catch (err) {
            console.error("Error with one cart item: ", err.message);
            throw err;
          }
        }

        await db.run("COMMIT");
        cart = null;
      } catch (err) {
        await db.run("ROLLBACK");

        console.error("Merge failed, rolled back:", err.message);

        return res
          .status(500)
          .json({ error: "Something went wrong, Please try again." });
      }
    }

    const CartItemsInDb = await db.all(
      `SELECT P.name, P.stock, P.images, P.description, P.price, P.id AS product_id , CI.id AS cart_id, CI.quantity FROM products P
      LEFT JOIN cart_items CI ON P.id = CI.product_id
      LEFT JOIN users U ON CI.user_id = U.id
      WHERE CI.user_id = ?
      `,
      [userId]
    );

    res.status(200).json(CartItemsInDb);
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
