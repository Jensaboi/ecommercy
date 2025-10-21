import { getConnection } from "../db/getConnection.js";
import { generateSqlQueryForCart } from "../lib/utility.js";

export async function getCart(req, res) {
  const db = await getConnection();
  try {
    const { userId } = req.session;
    let cart = req.session.cart ?? [];
    const isItemsInSessionCart = cart?.[0];

    if (!userId) {
      if (isItemsInSessionCart) {
        const productIdsArray = cart.map(item => item.productId);

        const sqlQuery = generateSqlQueryForCart(productIdsArray);

        let productsInDb = await db.all(sqlQuery, productIdsArray);

        for (const cartItem of cart) {
          const match = productsInDb.find(
            product =>
              parseInt(product.product_id) === parseInt(cartItem.productId)
          );

          if (!match) {
            throw new Error("No products in DB with that product ID.");
          }

          match.quantity = cartItem.quantity;
        }

        cart = productsInDb;
        return res.status(200).json(cart ?? []);
      } else {
        return res.status(200).json([]);
      }
    }

    //User is logged in and have items in session cart.
    if (isItemsInSessionCart) {
      try {
        await db.run("BEGIN TRANSACTION");

        //loop over session cart
        for (const cartItem of cart) {
          try {
            await db.run(
              `
                INSERT INTO cart_items (user_id, product_id, quantity)
                VALUES (?, ?, ?)
                ON CONFLICT(user_id, product_id)
                DO UPDATE SET quantity = excluded.quantity;
                `,
              [userId, cartItem.productId, cartItem.quantity]
            );
          } catch (err) {
            console.error(
              `Failed to merge productId=${cartItem.productId} into DB cart:`,
              err.message
            );
            throw new Error(
              `Failed to merge product ${cartItem.productId}: ${err.message}`
            );
          }
        }

        await db.run("COMMIT");
        req.session.cart = [];
      } catch (err) {
        await db.run("ROLLBACK");

        console.error("Merge failed, rolled back:", err.message);

        throw err;
      }
    }

    const cartItemsInDb = await db.all(
      `SELECT P.name, P.stock, P.images, P.description, P.attributes, P.price, P.id AS product_id , CI.id , CI.quantity FROM cart_items CI
      LEFT JOIN products P ON P.id = CI.product_id
      WHERE CI.user_id = ?
      `,
      [userId]
    );

    return res.status(200).json(cartItemsInDb);
  } catch (err) {
    console.error("getCart route failed: ", err.message);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  } finally {
    await db.close();
  }
}

export async function addItem(req, res) {
  const db = await getConnection();
  try {
    const { userId } = req.session;
    const { productId } = req.body;
    const quantity = 1;
    let cart = req.session.cart ?? [];

    if (!productId)
      return res
        .status(400)
        .json({ message: "Bad request, Product-id is required." });

    if (!userId) {
      try {
        const existingCartItem = cart.find(
          item => parseInt(item.productId) === parseInt(productId)
        );

        if (existingCartItem) {
          existingCartItem.quantity++;
        } else {
          cart.push({ productId, quantity });
        }

        const productsIdsArray = cart.map(item => item.productId);

        const sqlQuery = generateSqlQueryForCart(productsIdsArray);

        let productsFromDb = await db.all(sqlQuery, productsIdsArray);

        for (const cartItem of cart) {
          const match = productsFromDb.find(
            product => parseInt(product.product_id) === cartItem.productId
          );

          if (!match) {
            throw new Error("No match on products in DB and session-cart.");
          }

          match.quantity = cartItem.quantity;
        }

        if (!req.session.cart) req.session.cart = cart;

        return res.status(200).json(productsFromDb);
      } catch (err) {
        throw new Error("Failed on session-cart: " + err.message);
      }
    }

    //User is logged in.
    try {
      const existingItemInDb = await db.get(
        "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
        [userId, productId]
      );

      if (existingItemInDb) {
        await db.run(
          "UPDATE cart_items SET quantity = quantity + 1 WHERE id = ?",
          [existingItemInDb.id]
        );
      } else {
        await db.run(
          `INSERT INTO cart_items (user_id, product_id, quantity) VALUES ( ?, ? ,? )`,
          [userId, productId, quantity]
        );
      }

      const cartItemsInDb = await db.all(
        `
      SELECT C.id, C.quantity, C.product_id , P.name, P.attributes, P.images, P.price, P.description, P.stock FROM cart_items C
      LEFT JOIN products P ON C.product_id = P.id
      WHERE user_id = ?
      `,
        [userId]
      );

      return res.status(201).json(cartItemsInDb);
    } catch (err) {
      throw new Error("Failed to add item to DB-cart" + err.message);
    }
  } catch (err) {
    console.error("addItem route failed: " + err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong please try again." });
  } finally {
    await db.close();
  }
}

export async function deleteCart(req, res) {
  const db = await getConnection();
  try {
    const { userId } = req.session;
    req.session.cart = [];

    if (userId) {
      await db.exec("DELETE FROM cart_items WHERE user_id = ?", [userId]);
    }

    return res.status(200).json([]);
  } catch (err) {
    console.error(`DeleteCart route failed: `, err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong please try again." });
  } finally {
    await db.close();
  }
}

export async function deleteItem(req, res) {
  const db = await getConnection();
  try {
    const { userId } = req.session;
    const { productId } = req.params;
    let cart = req.session.cart ?? [];

    if (!productId)
      return res.status(400).json({ message: "Product-id is required." });

    if (!userId) {
      cart = cart.filter(
        item => parseInt(item?.productId) !== parseInt(productId)
      );

      const isItemsInSessionCart = cart?.[0];
      if (!isItemsInSessionCart) {
        return res.status(200).json(cart);
      }

      const filteredIds = cart.map(item => item.productId);

      const sqlQuery = generateSqlQueryForCart(filteredIds);

      let productsFromDb = await db.all(sqlQuery, filteredIds);

      for (const cartItem of cart) {
        const match = productsFromDb.find(
          product => parseInt(product.product_id) === cartItem.productId
        );

        if (!match) {
          throw new Error("No products in DB with that product ID.");
        }

        match.quantity = cartItem.quantity;
      }

      req.session.cart = cart;
      return res.status(200).json(productsFromDb);
    }

    //User is logged in.
    const existingItem = await db.get(
      "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (!existingItem)
      return res.status(400).json({
        message: "Item you want to delete doesnt exist in your cart.",
      });

    try {
      if (existingItem.quantity >= 2) {
        await db.run(
          "UPDATE cart_items SET quantity = quantity - 1 WHERE id = ?",
          [existingItem.id]
        );
      } else {
        await db.run("DELETE FROM cart_items WHERE user_id = ? AND id = ?", [
          userId,
          existingItem.id,
        ]);
      }
    } catch (err) {
      throw new Error("Failed to update/delete item from DB: " + err.message);
    }

    const cartItemsInDb = await db.all(
      `
      SELECT C.id, C.quantity, C.product_id , P.name, P.attributes, P.images, P.price, P.description, P.stock FROM cart_items C
      LEFT JOIN products P ON C.product_id = P.id
      WHERE user_id = ?
      `,
      [userId]
    );

    return res.status(200).json(cartItemsInDb);
  } catch (err) {
    console.error("DeleteItem route failed:", err.message);
    return res
      .status(500)
      .json({ message: "Something went wrong please try again." });
  } finally {
    await db.close();
  }
}

export async function updateItem(req, res) {
  return null;
}
