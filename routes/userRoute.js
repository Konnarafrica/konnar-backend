import express from 'express';
const router = express.Router();
import * as auth from "../middlewares/authMiddleware.js";

import { getAllUsers } from '../controllers/userController.js';


router.get('/all-users', auth.authorize, getAllUsers);


export default router;