import express from "express";
import { uploadAgentPictureController } from "../controllers/uploadAgentPictureController.js";
const router = express.Router();

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/images");
  },

  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.fieldname + Date.now() + file.originalname.split(".")[1]);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/agent-picture",
  upload.single("file"),
  uploadAgentPictureController
);

export default router;
