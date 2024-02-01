const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "employees",
});

app.get("/", (req, res) => {
  return res.send("Welcome to Employee backend");
});

// SELECT
app.get("/allEmployees", (req, res) => {
  const sql = "Select * from staffs";

  db.query(sql, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// SELECT
app.post("/specificEmployee", (req, res) => {
  const sql = "Select * from staffs where category=? and salary <= ?";
  const userData = req.body;

  db.query(sql, [userData.category, userData.salary], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// INSERT
app.post("/create", (req, res) => {
  const sql =
    "INSERT into staffs (id,Name,category,age,salary) VALUES(?,?,?,?,?)";
  const { id, name, category, age, salary } = req.body;

  db.query(sql, [id, name, category, age, salary], (err, data) => {
    if (err) return res.json(err);

    return res.send("Data Inserted Successfully");
  });
});

app.listen(7000, () => {
  console.log("Listening on 7000");
});
