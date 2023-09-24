import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Sign Up...
export const signUpUser = async (req, res) => {
  const { fullname, email, phone_number, password, status, isAdmin } = req.body;

  if (password.length <= 5)
    return res
      .status(400)
      .json({ message: "password should be at least 6 characters" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    fullname,
    email,
    phone_number,
    password: hashedPassword,
    status,
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
    res.status(500).json({ error: error.message });
  }
};

// Sign In...
export const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await userModel.findOne({ email });
    console.log(findUser)
    if (!findUser)
      return res
        .status(404)
        .json({ message: "invalid email address or password..." });

    const validity = await bcrypt.compare(password, findUser.password);

    if (validity) {
      const token = jwt.sign({ email: findUser.email, id: findUser._id }, process.env.JWT_SECRET, {expiresIn: '1h'});
      console.log(token)
      res.status(200).json({ user: findUser, token });
    } else {
      res.status(404).json({ message: "Incorrect Password..." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
