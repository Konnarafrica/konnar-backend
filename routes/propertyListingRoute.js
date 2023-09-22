import express from "express";
import multer from "multer";
import {
  addPropertyListing,
  deletePropertyListing,
  getPropertyListing,
  getPropertyListings,
  updatePropertyListing,
} from "../controllers/propertyListingController.js";

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
  .get("/get-propertylistings", getPropertyListings)
  .get("/get-propertylisting/:id", getPropertyListing)
  .post("/add-propertylisting", addPropertyListing)
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
  .patch("/update-propertylisting/:id", updatePropertyListing)
  .delete("/delete-propertylisting/:id", deletePropertyListing);

export default router;
