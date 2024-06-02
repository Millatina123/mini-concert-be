// utils/fileUtils.js

const multer = require("multer");
const path = require("path");

const createFileUpload = (folder) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/${folder}`); // Destination folder for storing uploads
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname)); // File naming
    },
  });

  return multer({ storage });
};

module.exports = createFileUpload;
