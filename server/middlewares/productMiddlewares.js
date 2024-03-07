import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save uploaded files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Generate a unique filename for the uploaded file
  },
});
const upload = multer({ storage: storage });

const fileUploadMiddleware = upload.single("photo");

export default fileUploadMiddleware;
