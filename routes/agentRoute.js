import express from "express";
import {
  getAgents,
  getAgent,
  updateAgent,
  deleteAgent,
  addAgent,
} from "../controllers/agentController.js";

import * as auth from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/get-agents", auth.authorize, getAgents);
router.get("/get-agent/:id", auth.authorize, getAgent);
router.post("/add-agent", auth.authorize, addAgent);
router.patch("/update-agent/:id", auth.authorize, updateAgent);
router.delete("/delete-agent/:id", auth.authorize, deleteAgent);

export default router;