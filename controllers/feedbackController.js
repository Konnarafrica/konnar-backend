import feedbackModel from "../models/feedbackModel.js";
import userModel from "../models/userModel.js";

export const addFeedback = async (req, res) => {
    const id = req.params.id;
    const { feedback_message } = req.body;
    
    // const newFeedback = new feedbackModel({
    //     userId: id,
    //     feedback_message
    // });

    try {
        const user_with_feedback = await userModel.findById( id );
        console.log(user_with_feedback)
        // await newFeedback.save();
        res.status(200).json({message: "Thanks for your feedback"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
    console.log(feedback_message)
}