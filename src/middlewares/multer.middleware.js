import multer from "multer";

// Configure Multer to store uploaded files in the "./public/temp" directory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // Store files in "./public/temp"
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Keep the original file name
  }
});

// Create a Multer upload instance using the configured storage
export const upload = multer({ storage });

// This export allows other parts of your application to use the configured Multer instance for handling file uploads.
