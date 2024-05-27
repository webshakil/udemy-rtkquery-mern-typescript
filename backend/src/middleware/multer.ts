import multer from "multer";
import { v4 as uuid } from "uuid";
//import path from "path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "uploads");
  },
  filename(req, file, callback) {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    callback(null, `${id}.${extName}`);
  },
});

// File type validation
const allowedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
//const allowedFileTypes = ["image/png" ];

const fileFilter = (req: any, file: any, callback: any) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error("File type is not allowed"), false);
  }
};

// File size validation (in bytes)
const maxFileSize = 5 * 1024 * 1024; // 5MB
//const maxFileSize = 10; // 5MB

const limits = {
  fileSize: maxFileSize,
};

const singleUpload = multer({ storage, fileFilter, limits }).single("photo");
export default singleUpload;