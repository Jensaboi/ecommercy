import { getConnection } from "../db/getConnection.js";
import { generateSelecAllFromTableWithIds } from "../lib/utility.js";

export async function getAllItems(req, res) {
  const db = await getConnection();
  const { userId } = req.session;
  let { cart } = req.session;

  try {
    if (!userId) {
      if (cart) {
        try {
          const productIdsArray = cart.map(item => item.productId);

          const sqlQuery = generateSelecAllFromTableWithIds(
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
                .json({ message: "Something went wrong, Please try again." });
            }

            match.quantity = item.quantity;
          }

          cart = products;
          return res.status(200).json(cart ?? []);
        } catch (err) {
          console.log("Failed to get session cart: " + err.message);
          return res
            .status(500)
            .json({ message: "Something went wrong, Please try again." });
        }
      } else {
        return res.status(200).json([]);
      }
    }

    if (cart) {
      try {
        const currentCartItemsInDb = await db.all(
          `SELECT P.name, P.stock, P.images, P.description, P.price, P.id AS product_id , CI.id , CI.quantity FROM products P
            LEFT JOIN cart_items CI ON P.id = CI.product_id
            LEFT JOIN users U ON CI.user_id = U.id
          WHERE CI.user_id = ?
      `,
          [userId]
        );
        await db.run("BEGIN TRANSACTION");

        //loop over session cart
        for (const cartItem of cart) {
          try {
            const match = currentCartItemsInDb.find(
              item => parseInt(item.product_id) === parseInt(cartItem.productId)
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

        req.session.cart = null;
      } catch (err) {
        await db.run("ROLLBACK");

        console.error("Merge failed, rolled back:", err.message);

        return res
          .status(500)
          .json({ message: "Something went wrong, Please try again." });
      }
    }

    const CartItemsInDb = await db.all(
      `SELECT P.name, P.stock, P.images, P.description, P.attributes, P.price, P.id AS product_id , CI.id , CI.quantity FROM products P
      LEFT JOIN cart_items CI ON P.id = CI.product_id
      LEFT JOIN users U ON CI.user_id = U.id
      WHERE CI.user_id = ?
      `,
      [userId]
    );

    res.status(200).json(CartItemsInDb);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  } finally {
    await db.close();
  }
}

export async function addItem(req, res) {
  const db = await getConnection();
  const { userId } = req.session;
  const { productId } = req.body;
  const quantity = 1;

  if (!productId)
    return res
      .status(400)
      .json({ message: "Bad request, Product-id is required." });

  if (!userId) {
    try {
      const cart = req.session?.cart ?? [];

      const existingCartItem = cart.find(
        item => parseInt(item.productId) === parseInt(productId)
      );

      if (existingCartItem) {
        existingCartItem.quantity++;
      } else {
        cart.push({ productId, quantity });
      }

      const productsIdsArray = cart.map(item => item.productId);

      const sqlQuery = generateSelecAllFromTableWithIds(
        productsIdsArray,
        "products"
      );

      let productsFromDb = await db.all(sqlQuery, productsIdsArray);

      for (const cartItem of cart) {
        const match = productsFromDb.find(
          item => parseInt(item.id) === cartItem.productId
        );

        if (!match) {
          throw new Error("No match on products in DB and session-cart.");
        }

        match.quantity = cartItem.quantity;
      }

      if (!req.session.cart) req.session.cart = cart;

      return res.status(200).json(productsFromDb);
    } catch (err) {
      console.log("Failed on session cart: " + err.name);
      return res
        .status(500)
        .json({ message: "Something went wrong, Please try again" });
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
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong please try again." });
  } finally {
    await db.close();
  }
}

export async function deleteAllItems(req, res) {
  const db = await getConnection();
  const { userId } = req.session;
  req.session.cart = null;
  try {
    await db.exec("DELETE FROM cart_items WHERE user_id = ?", [userId]);

    return res.status(200).json([]);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong please try again." });
  } finally {
    await db.close();
  }
}

export async function deleteItem(req, res) {
  const db = await getConnection();
  const { userId, cart } = req.session;
  const { productId } = req.params;

  if (!productId)
    return res.status(400).json({ message: "Product-id is required." });

  try {
    if (!userId) {
      try {
        let cart = req.session.cart ?? [];

        cart = cart.filter(
          item => parseInt(item?.productId) !== parseInt(productId)
        );

        const filteredIds = cart.map(item => item.productId);

        const sqlQuery = generateSelecAllFromTableWithIds(
          filteredIds,
          "products"
        );

        let productsFromDb = await db.all(sqlQuery, filteredIds);

        for (const cartItem of cart) {
          const match = productsFromDb.find(
            item => parseInt(item.id) === cartItem.productId
          );

          if (!match) {
            throw new Error("No match on products in DB and session-cart.");
          }

          match.quantity = cartItem.quantity;
        }

        return res.status(200).json(productsFromDb);
      } catch (err) {
        console.log("ERROR: " + err.name);
        return res
          .status(500)
          .json({ message: "Something went wrong, Please try again." });
      }
    }

    //User is logged in.
    const existingItem = await db.get(
      "SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (!existingItem)
      return res.status(400).json({ message: "Item not found." });

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
    console.log(err);
    return res
      .status(500)
      .json({ message: "Something went wrong please try again." });
  } finally {
    await db.close();
  }
}
