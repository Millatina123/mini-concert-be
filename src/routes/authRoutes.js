const express = require("express");
const { register, login, verifyToken, updateUser, updatePasswword } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/update-user/:id", updateUser);
router.post("/update-password/:id", updatePasswword);
router.get("/verify-token", verifyToken, (req, res) => {
  // If the token is valid, userId and userRole will be available in the request object
  const { userId, userRole } = req;
  res.json({ userId, userRole, message: "This is a protected route" });
});

module.exports = router;
