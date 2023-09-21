import mongoose from "mongoose";

const propertyListingsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    key_features: {
      type: Array,
      required: true,
    },
    amenities: {
      type: Array,
      default: [],
    },
    property_media: {
      type: Array,
      required: true,
    },
    cost_name: [],
    location: {
      lat: {
        type: Number,
      },
      long: {
        type: Number,
      },
    },
    availability_status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const propertyListingsModel = mongoose.model(
  "PropertyListings",
  propertyListingsSchema
);

export default propertyListingsModel;
