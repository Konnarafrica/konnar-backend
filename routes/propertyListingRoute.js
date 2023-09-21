import express from "express";
import { addPropertyListing, deletePropertyListing, getPropertyListing, getPropertyListings, updatePropertyListing } from "../controllers/propertyListingController.js";

const router = express.Router();

router
  .get("/get-propertylistings", getPropertyListings)
  .get("/get-propertylisting/:id", getPropertyListing)
  .post("/add-propertylisting", addPropertyListing)
    .patch("/update-propertylisting/:id", updatePropertyListing)
  .delete("/delete-propertylisting/:id", deletePropertyListing)
export default router;
