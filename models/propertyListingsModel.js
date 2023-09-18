import mongoose, { Schema, mongo } from "mongoose";

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
    cost_name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    agent: [
      {
        type: Schema.Types.ObjectId,
        ref: "agents",
      },
    ],
    location: {
      lat: {
        type: Number,
        required: true,
      },
      long: {
        type: Number,
        required: true,
      },
    },
    availability_status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const propertyListings = mongoose.model(
  "PropertyListings",
  propertyListingsSchema
);

export default propertyListings;
