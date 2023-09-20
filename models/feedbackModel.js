import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    feedback_message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const feedbackModel = mongoose.model("feedbacks", feedbackSchema);

export default feedbackModel;
