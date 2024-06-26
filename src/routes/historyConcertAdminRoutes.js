const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { historyConcertAdmin, detailConcert } = require("../controllers/historyConcertAdmin");

const router = express.Router();

router.get("/", authenticate, historyConcertAdmin);
router.get("/detail-concert/:id", authenticate, detailConcert);

module.exports = router;
