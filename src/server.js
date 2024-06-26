const express = require("express");
const multer = require("multer");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
// const paymentRoutes = require("./routes/paymentRoutes");
const concertRoutes = require("./routes/concertRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const settingConcertRoutes = require("./routes/settingConcertRoutes");
const historyConcertCustomerRoutes = require("./routes/historyConcertCustomerRoutes");
const errorHandler = require("./utils/errorHandler");
const historyConcertAdminRoutes = require("./routes/historyConcertAdminRoutes");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all HTTP methods
    allowedHeaders: ["*"], // Allow these headers
  })
);
app.use(express.json());
app.use(express.static("public"));

app.use("/api/auth", authRoutes);
// app.use("/api/payments", paymentRoutes);
app.use("/api/concerts", concertRoutes);
app.use("/api/user/payment", paymentRoutes);
app.use("/api/setting-concerts", settingConcertRoutes);
app.use("/api/history-concert-customers", historyConcertCustomerRoutes);
app.use("/api/history-concert-admin", historyConcertAdminRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
