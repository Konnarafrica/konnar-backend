import feedbackModel from "../models/feedbackModel.js";
import userModel from "../models/userModel.js";

export const addFeedback = async (req, res) => {
  const id = req.params.id;//get id params...
  const { feedback_message } = req.body;//get data from client...
// check if the id params exists 
  if (id === null)
    return res.status(403).json({
      error:
        "sorry you cannot cannot perform this action because it looks like you are not logged in...",
    });

  try {
    const user_with_feedback = await userModel.findById(id); //get the user making the feedback...
    if (user_with_feedback) {
      const newFeedback = new feedbackModel({
        userId: id,
        feedback_message,
      });

      await newFeedback.save(); //save to the DB...
      res.status(200).json({
        message:
          "Your feedback has successfully been recieved, it will be reviewed.",
      });
    } else {
      res.status(404).json({ message: "User does not exist..." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
