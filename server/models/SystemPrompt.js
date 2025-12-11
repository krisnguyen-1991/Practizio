import { promptsDB } from '../database/db.js';

export class SystemPrompt {
  /**
   * Get all system prompts
   */
  static getAll() {
    return promptsDB.getAll();
  }

  /**
   * Get system prompt by ID
   */
  static getById(id) {
    return promptsDB.getById(id);
  }

  /**
   * Get system prompt by practice ID
   */
  static getByPracticeId(practiceId) {
    return promptsDB.getByPracticeId(practiceId);
  }

  /**
   * Create a new system prompt for a practice
   */
  static create({ practiceId, content }) {
    return promptsDB.create({ practiceId, content });
  }

  /**
   * Update a system prompt
   */
  static update(id, { content }) {
    return promptsDB.update(id, { content });
  }

  /**
   * Update system prompt by practice ID
   */
  static updateByPracticeId(practiceId, { content }) {
    return promptsDB.updateByPracticeId(practiceId, { content });
  }

  /**
   * Delete a system prompt
   */
  static delete(id) {
    promptsDB.delete(id);
  }

  /**
   * Delete system prompt by practice ID
   */
  static deleteByPracticeId(practiceId) {
    promptsDB.deleteByPracticeId(practiceId);
  }
}
