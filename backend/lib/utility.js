export function generateSqlQueryForCart(idsArr) {
  let str = `SELECT name, stock, images, description, price, id AS product_id, attributes FROM products`;

  idsArr.forEach(_ => {
    let clause = "WHERE";

    if (str.includes(clause)) clause = "OR";

    str += ` ${clause} id = ?`;
  });

  return str;
}
