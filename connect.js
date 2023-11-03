import mysql from "mysql";

// export const db = mysql.createConnection({
//   host: "b39ek7wfsxgydxv8etrf-mysql.services.clever-cloud.com",
//   user: "uvtektvotbm3iedq",
//   password: "LY5JmfL6ZymW3M6kJJkI",
//   database: "b39ek7wfsxgydxv8etrf",
// });

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "acbok",
});
