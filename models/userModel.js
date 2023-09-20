import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
        },
        status: {
            type: String,
            default: "Individual"
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
  },
  { timestamps: true }
);

const userModel = mongoose.model("Users", userSchema);

export default userModel;
