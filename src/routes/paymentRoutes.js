const express = require("express");
const { listConcerts, createPayment, listVerifyPayment, updatePaymentStatus, listTicketCustomer } = require("../controllers/paymentController");
const authenticate = require("../middlewares/authenticate");
const path = require("path");

const createFileUpload = require("../utils/uploadFileUtils");
const router = express.Router();

router.get("/", authenticate, listConcerts);
router.post("/", authenticate, createPayment);
router.get("/list-verify-payment", authenticate, listVerifyPayment);
router.get("/list-ticket-customer", authenticate, listTicketCustomer);
router.post("/verify/:paymentId", authenticate, updatePaymentStatus);

const upload = createFileUpload("evidence");
router.post("/upload", upload.single("evidence"), (req, res) => {
  const fileUrl = path.join("/evidence", req.file.filename); // Construct the file URL
  res.status(200).json({ url: fileUrl }); // Send back the URL of the uploaded file
}); // Ensure this route is protected
module.exports = router;
