import multer from "multer";

export const multerMemoryUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 mb limit
  },
});
