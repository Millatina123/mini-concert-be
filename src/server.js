const express = require("express");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes");
// const paymentRoutes = require("./routes/paymentRoutes");
const concertRoutes = require("./routes/concertRoutes");
const errorHandler = require("./utils/errorHandler");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api/payments", paymentRoutes);
app.use("/api/concerts", concertRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
