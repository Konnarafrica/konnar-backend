import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({

}, { timestamps: true });


const bookingModel = mongoose.model("bookings", bookingSchema);

export default bookingModel;