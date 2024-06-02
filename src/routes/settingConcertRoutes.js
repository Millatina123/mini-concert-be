const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { listSettingConcert } = require("../controllers/settingConcertController");

const router = express.Router();

router.get("/list-setting-concert", authenticate, listSettingConcert);

module.exports = router;
