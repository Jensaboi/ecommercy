export function generateSqlQueryWithIdsArray(idsArr, table) {
  let str = `SELECT * FROM ${table}`;

  idsArr.forEach(_ => {
    let clause = "WHERE";

    if (sqlQuery.includes(clause)) clause = "OR";

    sqlQuery += ` ${clause} id = ?`;
  });
}
