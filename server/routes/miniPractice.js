import express from 'express';
import {
  getAllMiniPractices,
  getMiniPracticeById,
  getMiniPracticesByCategory,
  searchMiniPractices,
  createMiniPractice,
  updateMiniPractice,
  deleteMiniPractice,
  getCategories
} from '../controllers/miniPracticeController.js';

const router = express.Router();

// Get all categories
router.get('/meta/categories', getCategories);

// Search mini practices
router.get('/search', searchMiniPractices);

// Get practices by category
router.get('/category/:category', getMiniPracticesByCategory);

// Get all mini practices
router.get('/', getAllMiniPractices);

// Get a single mini practice
router.get('/:id', getMiniPracticeById);

// Create a new mini practice
router.post('/', createMiniPractice);

// Update a mini practice
router.put('/:id', updateMiniPractice);

// Delete a mini practice
router.delete('/:id', deleteMiniPractice);

export default router;
