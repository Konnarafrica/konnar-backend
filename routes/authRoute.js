import express from 'express';
import {signInUser, signUpUser} from '../controllers/authController.js'

const router = express.Router();

router.post('/register', signUpUser)
      .post('/login', signInUser)


export default router;