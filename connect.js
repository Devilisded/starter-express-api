// import mysql from "mysql";
import { createPool } from "mysql";

export const db = createPool({
  host: "bddf4mrkfuywgigfafoi-mysql.services.clever-cloud.com",
  user: "uug8rnfkk0zaxelo",
  password: "Youi278d6gKl4rYGcMS3",
  database: "bddf4mrkfuywgigfafoi",
  connectionLimit: 5,
});

// export const db = mysql.createConnection({
//   host: "bddf4mrkfuywgigfafoi-mysql.services.clever-cloud.com",
//   user: "uug8rnfkk0zaxelo",
//   password: "Youi278d6gKl4rYGcMS3",
//   database: "bddf4mrkfuywgigfafoi",
// });

// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "acbok",
// });
