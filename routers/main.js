const router = require("express").Router();
const { initDB } = require("../models/db_base");
const jwt = require("jsonwebtoken");
const SECRET = "yourSecretKey";

router.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

router.get("/init", (req, res) => {
  initDB();
  res.json({ msg: "DB initialized" });
});

router.post("/login", (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ msg: "Username required" });
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: "1h"});
  res.json({ token });
});

module.exports = router;
