const express = require("express");
const { listConcerts } = require("../controllers/paymentController");
const authenticate = require("../middlewares/authenticate");
const multer = require("multer");
const router = express.Router();

router.get("/", authenticate, listConcerts);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/evidence"); // Destination folder for storing uploads
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // File naming
  },
});

const upload = multer({ storage });
router.post("/upload", upload.single("logo"), (req, res) => {
  const fileUrl = path.join("uploads/logo", req.file.filename); // Construct the file URL
  res.status(200).json({ url: fileUrl }); // Send back the URL of the uploaded file
}); // Ensure this route is protected
module.exports = router;
