import { getConnection } from "../db/getConnection.js";

export async function getProductWithId(req, res) {
  const db = await getConnection();
  const { id } = req.params;

  if (!id)
    return res
      .status(400)
      .json({ error: "Bad request, you need to add a product id." });

  try {
    const item = await db.get("SELECT * FROM products WHERE id = ?", [id]);

    if (!item)
      return res.status(200).json({ error: "Theres no product with this id." });

    return res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong. Please try again." });
  } finally {
    await db.close();
  }
}

export async function getProducts(req, res) {
  const db = await getConnection();

  const { category, subCategory, search } = req.query;

  try {
    let filters = [];
    let sqlQuery = `
    SELECT P.* FROM products P
    INNER JOIN sub_categories SC ON P.sub_category_id = SC.id
    INNER JOIN categories C ON SC.category_id = C.id
    WHERE 1=1 `;

    if (category) {
      sqlQuery += `AND C.name = ?`;
      filters.push(category);
    }

    if (subCategory) {
      sqlQuery += `AND SC.name = ?`;

      filters.push(subCategory);
    }

    if (search) {
      sqlQuery += `AND (SC. name LIKE ? OR C.name LIKE ? OR P.name LIKE ?)`;
      const searchStr = `%${search}%`;

      filters.push(searchStr);
      filters.push(searchStr);
      filters.push(searchStr);
    }

    const items = await db.all(sqlQuery, filters);
    console.log(items);
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong, Please try again." });
  } finally {
    await db.close();
  }
}

export async function getProductCategories(req, res) {
  const db = await getConnection();
  try {
    let temp = {};

    const categories = await db.all("SELECT * FROM categories");

    categories.forEach(category => (temp[category.name] = []));

    const subCategories = await db.all("SELECT * FROM sub_categories");

    subCategories.forEach(type => {
      const isMatch = categories.find(
        category => category.id === type.category_id
      );

      if (isMatch) {
        temp[isMatch.name].push(type.name);
      }
    });

    res.status(200).json(temp);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong, Please try again." });
  } finally {
    await db.close();
  }
}

//admin functionallity later
export async function addProduct(req, res) {
  const db = await getConnection();
  try {
  } catch (err) {
  } finally {
    await db.close();
  }
}

export async function deleteProduct(req, res) {
  const db = await getConnection();

  const { id } = req.params;
  try {
  } catch (err) {
  } finally {
    await db.close();
  }
}

export async function updateProduct(req, res) {
  const db = await getConnection();
  try {
  } catch (err) {
  } finally {
    await db.close();
  }
}
