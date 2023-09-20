import feedbackModel from "../models/feedbackModel.js";
import userModel from "../models/userModel.js";

export const addFeedback = async (req, res) => {
  const id = req.params.id;
  const { feedback_message } = req.body;

  if (id === null)
    return res
      .status(403)
      .json({
        error:
          "sorry you cannot cannot perform this action because it looks like you are not logged in...",
      });

  try {
    const user_with_feedback = await userModel.findById(id);
    if (user_with_feedback) {
      const newFeedback = new feedbackModel({
        userId: id,
        feedback_message,
      });

      await newFeedback.save();
      res.status(200).json({ message: "Thanks for your feedback" });
    } else {
      res.status(404).json({ error: "User does not exist..." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  console.log(feedback_message);
};
