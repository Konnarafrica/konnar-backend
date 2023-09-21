import mongoose from "mongoose";

const agentSchema = mongoose.Schema({

}, { timestamps: true });


const agentModel = mongoose.model("Agents", agentSchema);

export default agentModel;