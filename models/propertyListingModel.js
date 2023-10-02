import mongoose from "mongoose";

const propertyListingSchema = new mongoose.Schema(
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
    cost: {
      rent: {
        type: Number,
        required: true,
      },
      agent_fee: {
        type: Number,
        required: true,
      },
      legal_fee: {
        type: Number,
        required: true,
      },
      security_deposit: {
        type: Number,
        required: true,
      },
    },
    agent_id: {
      type: String,
      required: true,
    },
    area: {
      type: [],
      required: true,
    },
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

const propertyListingModel = mongoose.model(
  "PropertyListings",
  propertyListingSchema
);

export default propertyListingModel;
