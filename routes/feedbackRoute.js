import express from "express";
import { addFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.post('/add-feedback/:id', addFeedback);

export default router;