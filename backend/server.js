const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect((err) => {
  if (err) {
    console.log("DB connection failed:", err);
  } else {
    console.log("MySQL connected 🚀");
  }
});

// Test route

// Insert lead
app.post("/leads", (req, res) => {
  const { name, email, message } = req.body;

  const sql =
    "INSERT INTO leads (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Get all leads
app.get("/leads", (req, res) => {
  db.query("SELECT * FROM leads", (err, result) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json(result);
  });
});
app.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Yuvex Backend Running 🚀"
  });
});
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});