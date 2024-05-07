// app.js
const express = require("express");
const bodyParser = require("body-parser");

const userController = require("./controller/userController");

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json());

app.post("/register", userController.registerUser);

// Login Route
app.post("/login", userController.loginUser);
app.get("/", (req, res) => {
  res.send("Successful response.");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
