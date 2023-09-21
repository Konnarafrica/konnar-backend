import express from 'express';
import { getAgents, getAgent, updateAgent, deleteAgent , addAgent } from '../controllers/agentController.js'

const router = express.Router();


router.get('/manage-agents', getAgents)
router.post('/add-agent', addAgent)
router.get('/manage-agent/:id', getAgent)
router.patch('/update-agent/:id', updateAgent)
router.delete('/delete-agent/:id', deleteAgent)


export default router;