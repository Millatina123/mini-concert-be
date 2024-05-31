const express = require("express");
const { listConcerts, createConcert, listPayments } = require("../controllers/concertController");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const prisma = require("../prismaClient");

router.get("/", authenticate, listConcerts);
router.post("/", authenticate, createConcert);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/logo"); // Destination folder for storing uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // File naming
  },
});

const upload = multer({ storage });
router.post("/upload", upload.single("logo"), (req, res) => {
  const fileUrl = path.join("/logo", req.file.filename); // Construct the file URL
  res.status(200).json({ url: fileUrl }); // Send back the URL of the uploaded file
}); // Ensure this route is protected

module.exports = router;
