import express from 'express';
import { addProperty } from '../controllers/propertyListingsController.js';

const router = express.Router();

router.post('/add-property', addProperty);


export default router;