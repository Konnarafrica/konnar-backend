import userModel from "../models/userModel.js";
import agentModel from "../models/agentModel.js";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/token.js";

// Sign Up...
export const signUpUser = async (req, res) => {
  const { fullname, email, phone_number, password, status, isAdmin } = req.body;
  const { type } = req.params;

  if (password.length <= 5)
    return res
      .status(400)
      .json({ message: "password should be at least 6 characters" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    if (type === "house_hunter") {
      const newHouseHunter = new userModel({
        fullname,
        email,
        phone_number,
        password: hashedPassword,
        isAdmin,
      });

      const existingHouseHunter = await userModel.findOne({ fullname });

      if (existingHouseHunter)
        return res
          .status(404)
          .json({ message: `${type} already exits..try another username` });

      await newHouseHunter.save();
      return res.status(200).json({
        message: `${type} created successfully...`,
        user: newHouseHunter,
      });
    } else if (type === "house_agent") {
      const newHouseAgent = new agentModel({
        fullname,
        email,
        phone_number,
        password: hashedPassword,
      });
      const existingHouseAgent = await agentModel.findOne({ fullname });

      if (existingHouseAgent)
        return res
          .status(404)
          .json({ message: `${type} already exits..try another username` });

      await newHouseAgent.save();
      return res.status(200).json({
        message: `${type} created successfully...`,
        user: newHouseAgent,
      });
    }

    res.status(403).json({ message: "cannot perform this operation..." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sign In...
export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  const { type } = req.params;

  try {
    if (type === "house_hunter") {
      const existingHouseHunter = await userModel.findOne({ email });

      if (!existingHouseHunter)
        return res.status(404).json({ message: `${type} does not exist...` });

      const validity = await bcrypt.compare(
        password,
        existingHouseHunter.password
      );

      if (validity) {
        const { _id, fullname, email } = existingHouseHunter;
        const { password, ...user_without_password } = existingHouseHunter._doc;

        const accessToken = createAccessToken({ id: _id, fullname, email });
        const refreshToken = createRefreshToken({
          id: _id,
          fullname,
          email,
        });

        return res
          .status(200)
          .json({ user: user_without_password, accessToken });
      } else {
        return res
          .status(404)
          .json({ message: "invalid email address or password..." });
      }
    } else if (type === "house_agent") {
      const existingHouseAgent = await agentModel.findOne({ email });

      if (!existingHouseAgent)
        return res.status(404).json({ message: `${type} does not exist..` });

      const validity = await bcrypt.compare(
        password,
        existingHouseAgent.password
      );

      if (validity) {
        const { _id, fullname, email } = existingHouseAgent;
        const { password, ...user_without_password } = existingHouseAgent._doc;

        const accessToken = createAccessToken({ id: _id, fullname, email });
        const refreshToken = createRefreshToken({
          id: _id,
          fullname,
          email,
        });

        return res
          .status(200)
          .json({ user: user_without_password, accessToken });
      } else {
        return res
          .status(404)
          .json({ message: "invalid email address or password..." });
      }

      // req.body.refresh_token = refreshToken;

      // console.log(findUser.refresh_token);
      //  new userModel({
      //    fullname: findUser.fullname,
      //    email: findUser.email,
      //    phone_number: findUser.phone_number,
      //    password: findUser.password,
      //    isAdmin: findUser.isAdmin,
      //    refresh_token: findUser.refresh_token,
      //  });
    }

    res.status(403).json({ message: "cannot perform this operation..." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
