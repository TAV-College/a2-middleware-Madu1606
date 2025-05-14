// Base imports
const express = require("express");
const bodyParser = require("body-parser");

// Router Imports
const logger = require("./middlewares/logger.js");

const mainRouter = require("./routers/main.js");
const bookRouter = require("./routers/books.js");
const port = process.env.PORT || 3000;

// Create & Configure App
const app = express();
app.use(logger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Load routers
app.use("", mainRouter);
app.use("", bookRouter);

app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

// Run app
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
