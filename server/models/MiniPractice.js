import { practicesDB, promptsDB } from '../database/db.js';

export class MiniPractice {
  /**
   * Get all mini practices
   */
  static getAll() {
    return practicesDB.getAll();
  }

  /**
   * Get mini practice by ID
   */
  static getById(id) {
    return practicesDB.getById(id);
  }

  /**
   * Get mini practice with its system prompt
   */
  static getWithSystemPrompt(id) {
    const practice = practicesDB.getById(id);
    
    if (!practice) {
      return null;
    }

    const systemPrompt = promptsDB.getByPracticeId(id);
    
    return {
      ...practice,
      systemPrompt: systemPrompt ? systemPrompt.content : null,
      systemPromptId: systemPrompt ? systemPrompt.id : null
    };
  }

  /**
   * Get practices by category
   */
  static getByCategory(category) {
    return practicesDB.getByCategory(category);
  }

  /**
   * Search practices by title or description
   */
  static search(searchTerm) {
    return practicesDB.search(searchTerm);
  }

  /**
   * Create a new mini practice
   */
  static create({ title, description, tags, category }) {
    return practicesDB.create({
      title,
      description,
      tags: tags || [],
      category
    });
  }

  /**
   * Update a mini practice
   */
  static update(id, { title, description, tags, category }) {
    return practicesDB.update(id, {
      title,
      description,
      tags: tags || [],
      category
    });
  }

  /**
   * Delete a mini practice (will cascade delete system prompt)
   */
  static delete(id) {
    practicesDB.delete(id);
  }

  /**
   * Get all unique categories
   */
  static getCategories() {
    return practicesDB.getCategories();
  }
}
