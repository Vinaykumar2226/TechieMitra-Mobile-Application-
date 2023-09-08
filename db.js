const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "Vinay",
  port: 5432,
});

// pool.query(
//   "INSERT INTO logindtls (username, password) VALUES ('John', 'john.d')",
//   (err, res) => {
//     if (err) {
//       console.error(err);
//     } else {
//       console.log(res.rows);
//     }
//   }
// );

app.get("/data", (req, res) => {
  const { query } = req.query;

  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Error executing query");
    } else {
      res.send(result.rows);
    }
  });
});

// app.post("/query", async (req, res) => {
//   const { query } = req.body;

//   try {
//     const result = await pool.query(query);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error executing query");
//   }
// });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
