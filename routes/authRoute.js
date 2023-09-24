import express from 'express';
import {signInUser, signUpUser} from '../controllers/authController.js'

const router = express.Router();

router.post('/register/:type', signUpUser)
      .post('/login/:type', signInUser)


export default router;