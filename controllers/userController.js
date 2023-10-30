import userModel from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  if (!req.user.isAdmin)
    return res
      .status(403)
      .json({ message: "only admins can perform this operation..." });

  try {
    let getUsers = await userModel.find({});

    if (!getUsers) {
      return res.status(404).json({ message: "no users found in records" });
    }

    getUsers = getUsers.map((user) => {
      const { password, refresh_token, ...otherDetails } = user._doc;
      console.log(otherDetails);
      return otherDetails;
    });

    return res
      .status(200)
      .json({ message: "users successfully retrived", users: getUsers });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
