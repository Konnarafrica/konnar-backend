import express from "express";
import multer from "multer";
import {
  addPropertyListing,
  deletePropertyListing,
  getPropertyListing,
  getPropertyListings,
  updatePropertyListing,
} from "../controllers/propertyListingController.js";

import * as auth from "../middlewares/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

router
  .get("/get-propertylistings", auth.authorize, getPropertyListings)
  .get("/get-propertylisting/:id", auth.authorize, getPropertyListing)
  .post("/add-propertylisting", auth.authorize, addPropertyListing)
  .post(
    "/upload-propertylistingmedia",
    upload.single("file", (req, res) => {
      try {
        return res.status(200).json("File uploaded successfully");
      } catch (error) {
        console.log(error);
      }
    })
  )
  .patch("/update-propertylisting/:id", auth.authorize, updatePropertyListing)
  .delete("/delete-propertylisting/:id", auth.authorize, deletePropertyListing);

export default router;
