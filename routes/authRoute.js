import express from 'express';
import {signInUser, signOutUser, signUpUser} from '../controllers/authController.js'

const router = express.Router();

router
  .post("/register", signUpUser)
  .post("/login", signInUser)
  .post("/logout", signOutUser);



export default router;