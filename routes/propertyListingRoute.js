import express from "express";
import multer from "multer";
import {
  addPropertyListing,
  deletePropertyListing,
  getPropertyListing,
  getPropertyListings,
  updatePropertyListing,
  uploadPropertyListingMedia,
  searchPropertyListings,
} from "../controllers/propertyListingController.js";

import * as auth from "../middlewares/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router
  .get("/get-propertylistings", auth.authorize, getPropertyListings)
  .get("/get-propertylisting/:id", auth.authorize, getPropertyListing)
  .get("/search-propertylistings", searchPropertyListings)
  .post("/add-propertylisting", auth.authorize, addPropertyListing)
  .post(
    "/upload-propertylistingmedia",
    upload.single("property_media", uploadPropertyListingMedia)
  )
  .patch("/update-propertylisting/:id", auth.authorize, updatePropertyListing)
  .delete("/delete-propertylisting/:id", auth.authorize, deletePropertyListing);

export default router;
