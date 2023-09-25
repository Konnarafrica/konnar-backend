import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import {
  createAccessToken,
  createRefreshToken,
} from "../utils/token.js";

// Sign Up...
export const signUpUser = async (req, res) => {
  const { fullname, email, phone_number, password, isAdmin } = req.body; //get data from client...
  //check the length of the password..
  if (password.length <= 5)
    return res
      .status(400)
      .json({ message: "password should be at least 6 characters" });

  //check the length of phone_number...
  if (phone_number.length < 14 || phone_number.length > 14)
    return res
      .status(401)
      .json({ message: "phone number field must be 10 characters." });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt); //hash the password...
  // create a new user instance...
  const newUser = new userModel({
    fullname,
    email,
    phone_number,
    password: hashedPassword,
    isAdmin,
  });

  try {
    const existingUser = await userModel.findOne({ fullname }); //find if there exists this user already...

    if (existingUser)
      return res
        .status(404)
        .json({ message: "user already exits..try another username" });

    await newUser.save(); //save user to DB...

    const { password, refresh_token, ...safeUser } = newUser._doc;

    res
      .status(200)
      .json({ message: "user created successfully...", user: safeUser });
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
  const { email, password } = req.body; //get client data...

  try {
    const findUser = await userModel.findOne({ email }); //find user from DB...

    if (!findUser)
      return res
        .status(404)
        .json({ message: "invalid email address or password..." });

    const validity = await bcrypt.compare(password, findUser.password); //check the validity of user...

    if (validity) {
      const { password, refresh_token, ...safeUserInfo } = findUser._doc;

      const accessToken = createAccessToken(safeUserInfo); //create access token
      const refreshToken = createRefreshToken(safeUserInfo); //create refresh token

      await findUser.updateOne({ $set: { refresh_token: refreshToken } }); //update user field with refresh token...

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        path: "/auth/refresh-token",
      });

      res.status(200).json({
        message: "you are now logged in",
        user: safeUserInfo,
        accessToken,
      });
    } else {
      res.status(404).json({ message: "Incorrect Password..." });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sign Out
export const signOutUser = (req, res) => {
  res.clearCookie("refresh_token"); //clear refresh token from cookie.
  return res.status(200).json({ message: "you are now logged out" });
};

// get a refresh token...
// export const refreshToken = async (req, res) => {
//   const token = res.cookie.refresh_token;

//   if (!token) return res.status(404).json({ access_token: "" });

//   // if token exists verify token...
//   let payload = null;

//   try {
//     payload = verifyRefreshToken;
//   } catch (error) {
//     return res.status(404).json({ error: "could not verify token" });
//   }
//   console.log(payload);

//   const user = await userModel.findOne({ _id: payload._id });
//   if (!user) return res.status(404).json({ error: "could not verify token" });

//   if (user.refresh_token !== token)
//     return res.status(404).json({
//       message: "token mismatch",
//       access_token: "",
//     });

//   const { password, refresh_token, ...safeUser } = user;
//   const accessToken = createAccessToken(safeUser);
//   const refreshToken = createRefreshToken(safeUser);

//   console.log(accessToken);
//   await user.updateOne({ $set: { refresh_token: refreshToken } });

//   res.cookie("refresh_token", refreshToken);
//   res.status(200).json({
//     message: "access token successfully created...",
//     access_token: accessToken,
//   });
// };
