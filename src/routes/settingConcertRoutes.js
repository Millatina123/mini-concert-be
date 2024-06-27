const express = require("express");
const authenticate = require("../middlewares/authenticate");
const { listSettingConcert, updateLinkYtConcert, stopConcert } = require("../controllers/settingConcertController");

const router = express.Router();

router.get("/list-setting-concert", authenticate, listSettingConcert);
router.put("/update-link-yt/:concertId", authenticate, updateLinkYtConcert);
router.put("/stop-concert/:concertId", authenticate, stopConcert);

module.exports = router;
