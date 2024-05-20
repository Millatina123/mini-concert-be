const express = require("express");
const { listConcerts, createConcert, listPayments } = require("../controllers/concertController");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.get("/", listConcerts);
router.post("/", authenticate, createConcert); // Ensure this route is protected
// router.get("/payments", authenticate, listPayments);

module.exports = router;
