import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,

  limits: {
    fileSize: 7 * 1024 * 1024, // 7MB
    files: 5, // Maximum number of files
  },

  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG and GIF are allowed."));
    }
  },
});

export default upload;
