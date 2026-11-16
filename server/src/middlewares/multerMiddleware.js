import multer from "multer";

const allowedMimes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const ext = (file.originalname || "").toLowerCase();
    if (
      allowedMimes.includes(file.mimetype) ||
      ext.endsWith(".pdf") ||
      ext.endsWith(".docx")
    ) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Unsupported file format. Please upload a PDF (.pdf) or Word (.docx) document.",
        ),
        false,
      );
    }
  },
});

export default upload;
