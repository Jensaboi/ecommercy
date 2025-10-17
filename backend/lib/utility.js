export function generateSelecAllFromTableWithIds(idsArr, table) {
  let str = `SELECT * FROM ${table}`;

  idsArr.forEach(_ => {
    let clause = "WHERE";

    if (str.includes(clause)) clause = "OR";

    str += ` ${clause} id = ?`;
  });

  return str;
}
