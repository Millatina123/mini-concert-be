// userController.js
const bcrypt = require("bcrypt");
const db = require("../db.js");
const response = require("../response.js");

function registerUser(req, res) {
  const { nama, email, password } = req.body;

  // Hash password before storing it in the database
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = { nama, email, password: hashedPassword };

  db.query("INSERT INTO users SET ?", user, (error, results, fields) => {
    if (error) {
      console.error("Error registering user:", error);
      return response(500, user, "Register Gagal", res);
    }
    response(200, user, "Register Succesfully", res);
  });
}

function loginUser(req, res) {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email], (error, results, fields) => {
    if (error) {
      console.error("Error retrieving user:", error);
      return response(500, email, "Gagal Login", res);
    }

    if (results.length === 0) {
      return response(401, email, "Invalid Username or Password", res);
    }

    const user = results[0];

    // Compare hashed password
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return response(401, email, "Invalid Username and Password", res);
    }

    // Here you would generate a JWT token and send it back to the client
    return response(200, results, "Berhasil Login", res);
  });
}

module.exports = { registerUser, loginUser };
