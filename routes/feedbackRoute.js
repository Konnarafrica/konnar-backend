import express from "express";
import { addFeedback } from "../controllers/feedbackController.js";
import * as auth from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add-feedback/:id', auth.authorize, addFeedback);

export default router;