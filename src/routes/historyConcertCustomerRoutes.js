const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { historyTicketCustomer, updateReviewRating } = require("../controllers/historyConcertCustomer");

const router = express.Router();

router.get("/", authenticate, historyTicketCustomer);
router.put("/update-review-rating/:paymentId", authenticate, updateReviewRating);

module.exports = router;
