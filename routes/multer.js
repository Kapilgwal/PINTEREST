const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}`;

    cb(null, uniqueFilename + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

module.exports = upload;
