import { getConnection } from "../db/getConnection.js";

export async function getUser(req, res) {
  const db = await getConnection();

  const { userId } = req.session;

  try {
    const user = await db.get("SELECT name, email FROM users WHERE id = ?", [
      userId,
    ]);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again." });
  } finally {
    await db.close();
  }
}

export async function getWishlist(req, res) {
  const db = await getConnection();

  const { userId } = req.ression;

  try {
    const list = await db.all("SELECT * FROM watchlist WHERE user_id = ?", [
      userId,
    ]);

    res.status(200).json(list);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again." });
  } finally {
    await db.close();
  }
}

export async function addToWishlist(req, res) {
  const db = await getConnection();

  const { userId } = req.ression;
  const { productId } = req.body;

  if (!productId)
    return res.status(400).json({
      message: "Bad request, you need the product id to add to watchlist.",
    });

  try {
    const existing = await db.get(
      "SELECT * FROM watchlist WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (existing)
      return res
        .status(400)
        .json({ message: "Error, Item already in your watchlist." });

    await db.run("INSERT INTO watchlist (product_id, user_id) VALUES (? , ?)", [
      productId,
      userId,
    ]);

    res.status(201).json({ message: "Item added to watchlist." });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again." });
  } finally {
    await db.close();
  }
}

export async function deleteFromWishlistWithId(req, res) {
  const db = await getConnection();

  const { userId } = req.ression;
  const { productId } = req.params;
  try {
    const existing = await db.get(
      "SELECT * FROM watchlist WHERE user_id = ? AND product_id = ?",
      [userId, productId]
    );

    if (!existing)
      return res
        .status(400)
        .json({ error: "Error, item not found in your watchlist." });

    res.status(200).json({ message: "Item removed from watchlist." });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Something went wrong, Please try again." });
  } finally {
    await db.close();
  }
}
