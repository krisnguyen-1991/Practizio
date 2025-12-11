import { MiniPractice } from '../models/MiniPractice.js';
import { SystemPrompt } from '../models/SystemPrompt.js';

/**
 * Get all mini practices
 * GET /api/mini-practices
 */
export async function getAllMiniPractices(req, res) {
  try {
    const practices = MiniPractice.getAll();

    res.json({
      success: true,
      data: practices
    });
  } catch (error) {
    console.error('Error getting mini practices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get mini practices',
      message: error.message
    });
  }
}

/**
 * Get a single mini practice with its system prompt
 * GET /api/mini-practices/:id
 */
export async function getMiniPracticeById(req, res) {
  try {
    const { id } = req.params;
    const practice = MiniPractice.getWithSystemPrompt(id);

    if (!practice) {
      return res.status(404).json({
        success: false,
        error: 'Mini practice not found'
      });
    }

    res.json({
      success: true,
      data: practice
    });
  } catch (error) {
    console.error('Error getting mini practice:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get mini practice',
      message: error.message
    });
  }
}

/**
 * Get practices by category
 * GET /api/mini-practices/category/:category
 */
export async function getMiniPracticesByCategory(req, res) {
  try {
    const { category } = req.params;
    const practices = MiniPractice.getByCategory(category);

    res.json({
      success: true,
      data: practices
    });
  } catch (error) {
    console.error('Error getting practices by category:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get practices by category',
      message: error.message
    });
  }
}

/**
 * Search mini practices
 * GET /api/mini-practices/search?q=searchTerm
 */
export async function searchMiniPractices(req, res) {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }

    const practices = MiniPractice.search(q);

    res.json({
      success: true,
      data: practices
    });
  } catch (error) {
    console.error('Error searching mini practices:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search mini practices',
      message: error.message
    });
  }
}

/**
 * Create a new mini practice
 * POST /api/mini-practices
 * Body: { title, description, tags, category, systemPrompt }
 */
export async function createMiniPractice(req, res) {
  try {
    const { title, description, tags, category, systemPrompt } = req.body;

    // Validate required fields
    if (!title || !description || !category) {
      return res.status(400).json({
        success: false,
        error: 'Title, description, and category are required'
      });
    }

    // Create practice
    const practiceId = MiniPractice.create({
      title,
      description,
      tags: tags || [],
      category
    });

    // Create system prompt if provided
    if (systemPrompt) {
      SystemPrompt.create({
        practiceId,
        content: systemPrompt
      });
    }

    // Get the created practice with system prompt
    const practice = MiniPractice.getWithSystemPrompt(practiceId);

    res.status(201).json({
      success: true,
      data: practice
    });
  } catch (error) {
    console.error('Error creating mini practice:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create mini practice',
      message: error.message
    });
  }
}

/**
 * Update a mini practice
 * PUT /api/mini-practices/:id
 * Body: { title, description, tags, category, systemPrompt }
 */
export async function updateMiniPractice(req, res) {
  try {
    const { id } = req.params;
    const { title, description, tags, category, systemPrompt } = req.body;

    // Check if practice exists
    const existingPractice = MiniPractice.getById(id);
    if (!existingPractice) {
      return res.status(404).json({
        success: false,
        error: 'Mini practice not found'
      });
    }

    // Update practice
    MiniPractice.update(id, {
      title: title || existingPractice.title,
      description: description || existingPractice.description,
      tags: tags || existingPractice.tags || [],
      category: category || existingPractice.category
    });

    // Update system prompt if provided
    if (systemPrompt) {
      SystemPrompt.updateByPracticeId(id, { content: systemPrompt });
    }

    // Get the updated practice with system prompt
    const practice = MiniPractice.getWithSystemPrompt(id);

    res.json({
      success: true,
      data: practice
    });
  } catch (error) {
    console.error('Error updating mini practice:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update mini practice',
      message: error.message
    });
  }
}

/**
 * Delete a mini practice
 * DELETE /api/mini-practices/:id
 */
export async function deleteMiniPractice(req, res) {
  try {
    const { id } = req.params;

    // Check if practice exists
    const existingPractice = MiniPractice.getById(id);
    if (!existingPractice) {
      return res.status(404).json({
        success: false,
        error: 'Mini practice not found'
      });
    }

    // Delete practice (will cascade delete system prompt)
    MiniPractice.delete(id);

    res.json({
      success: true,
      message: 'Mini practice deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting mini practice:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete mini practice',
      message: error.message
    });
  }
}

/**
 * Get all categories
 * GET /api/mini-practices/meta/categories
 */
export async function getCategories(req, res) {
  try {
    const categories = MiniPractice.getCategories();
    
    res.json({
      success: true,
      data: categories.map(c => c.category)
    });
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get categories',
      message: error.message
    });
  }
}
