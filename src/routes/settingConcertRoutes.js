const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { listSettingConcert, updateLinkYtConcert } = require("../controllers/settingConcertController");

const router = express.Router();

router.get("/list-setting-concert", authenticate, listSettingConcert);
router.put("/update-link-yt/:concertId", authenticate, updateLinkYtConcert);

module.exports = router;
