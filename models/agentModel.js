import mongoose from "mongoose";

const agentSchema = mongoose.Schema(
  {
    full_name: { type: String, required: true },
    bio: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true, unique: true },
    picture: { type: String },
    availability: [
      {
        status: { type: Boolean, default: false },
        date: String,
        time: [String],
      },
    ],
    no_of_properties: { type: [String] },
  },
  { timestamps: true }
);

const agentModel = mongoose.model("Agents", agentSchema);

export default agentModel;

// const availabilitySchema = new mongoose.Schema({
//     status: Boolean,
//     date: String,
//     time: Array
// })

// ====> availability: [availabilitySchema],

// const reviewSchema = new mongoose.Schema({
//     id: String,
//     review_msg: String,
//     name_of_user: String
// })

// =========> reviews: [reviewSchema],
