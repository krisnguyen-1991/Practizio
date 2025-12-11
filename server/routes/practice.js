import express from 'express';
import { generatePracticeQuestion, reviewStudentAnswer } from '../controllers/practiceController.js';

const router = express.Router();

// Generate a new practice question
router.post('/generate', generatePracticeQuestion);

// Review student's answer
router.post('/review', reviewStudentAnswer);

export default router;

