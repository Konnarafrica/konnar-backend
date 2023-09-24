import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "../utils/token.js";

// Sign Up...
export const signUpUser = async (req, res) => {
  const { fullname, email, phone_number, password, isAdmin } = req.body;

  if (password.length <= 5)
    return res
      .status(400)
      .json({ message: "password should be at least 6 characters" });

  if (phone_number.length < 14 || phone_number.length > 14)
    return res
      .status(401)
      .json({ message: "phone number field must be 10 characters." });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    fullname,
    email,
    phone_number,
    password: hashedPassword,
    isAdmin,
  });

  try {
    const existingUser = await userModel.findOne({ fullname });

    if (existingUser)
      return res
        .status(404)
        .json({ message: "user already exits..try another username" });

    await newUser.save();

    res
      .status(200)
      .json({ message: "user created successfully...", user: newUser });
  } catch (error) {
    if (error.code === 11000)
      return res.status(403).json({
        error: "sorry a user with this email or phone number already exists...",
      });
    res.status(500).json({ error: error.message });
  }
};

// Sign In...
export const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await userModel.findOne({ email });

    if (!findUser)
      return res
        .status(404)
        .json({ message: "invalid email address or password..." });

    const validity = await bcrypt.compare(password, findUser.password);

    if (validity) {
      const { password, ...safeUserInfo } = findUser._doc;

      const accessToken = createAccessToken(safeUserInfo);
      const refreshToken = createRefreshToken(safeUserInfo);
      // findUser.refresh_token = refreshToken;

      //    console.log(findUser)

      // const loggedInUser = await userModel.findOne({ email });
      // // await loggedInUser.updateOne({})
      // console.log(loggedInUser)

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        path: "/refresh-token",
      });

      res.status(200).json({ user: safeUserInfo, accessToken });
    } else {
      res.status(404).json({ message: "Incorrect Password..." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

