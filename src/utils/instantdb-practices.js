import db from '../config/instantdb';
import { tx, id } from '@instantdb/react';

/**
 * InstantDB Practice Utilities
 * 
 * These functions help manage practices and system prompts in InstantDB.
 * All queries return reactive data that updates in real-time.
 */

/**
 * Query hook to get all practices with their system prompts
 * @returns {Object} { data, isLoading, error }
 */
export function useAllPractices() {
  return db.useQuery({
    practices: {
      systemPrompt: {}
    }
  });
}

/**
 * Query hook to get a single practice by ID with its system prompt
 * @param {string} practiceId - The practice ID
 * @returns {Object} { data, isLoading, error }
 */
export function usePracticeById(practiceId) {
  return db.useQuery({
    practices: {
      $: {
        where: {
          id: practiceId
        }
      },
      systemPrompt: {}
    }
  });
}

/**
 * Query hook to get practices by category
 * @param {string} category - The category name
 * @returns {Object} { data, isLoading, error }
 */
export function usePracticesByCategory(category) {
  return db.useQuery({
    practices: {
      $: {
        where: {
          category: category
        }
      },
      systemPrompt: {}
    }
  });
}

/**
 * Query hook to search practices by title or description
 * @param {string} searchTerm - The search term
 * @returns {Object} { data, isLoading, error }
 */
export function useSearchPractices(searchTerm) {
  if (!searchTerm) {
    return { data: { practices: [] }, isLoading: false, error: null };
  }

  return db.useQuery({
    practices: {
      $: {
        where: {
          or: [
            { title: { $like: `%${searchTerm}%` } },
            { description: { $like: `%${searchTerm}%` } }
          ]
        }
      },
      systemPrompt: {}
    }
  });
}

/**
 * Create a new practice with system prompt
 * @param {Object} practiceData - Practice details
 * @param {string} practiceData.title
 * @param {string} practiceData.description
 * @param {Array<string>} practiceData.tags
 * @param {string} practiceData.category
 * @param {string} systemPromptContent - The system prompt content
 * @returns {Promise<string>} The new practice ID
 */
export async function createPractice({ title, description, tags, category }, systemPromptContent) {
  const practiceId = id();
  const promptId = id();
  
  await db.transact([
    tx.practices[practiceId].update({
      title,
      description,
      tags,
      category,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }),
    tx.systemPrompts[promptId].update({
      content: systemPromptContent,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }),
    tx.practices[practiceId].link({ systemPrompt: promptId })
  ]);

  return practiceId;
}

/**
 * Update a practice
 * @param {string} practiceId - The practice ID
 * @param {Object} updates - Fields to update
 */
export async function updatePractice(practiceId, updates) {
  await db.transact([
    tx.practices[practiceId].update({
      ...updates,
      updatedAt: Date.now()
    })
  ]);
}

/**
 * Update a system prompt
 * @param {string} promptId - The system prompt ID
 * @param {string} content - The new content
 */
export async function updateSystemPrompt(promptId, content) {
  await db.transact([
    tx.systemPrompts[promptId].update({
      content,
      updatedAt: Date.now()
    })
  ]);
}

/**
 * Delete a practice and its system prompt
 * @param {string} practiceId - The practice ID
 * @param {string} promptId - The system prompt ID
 */
export async function deletePractice(practiceId, promptId) {
  await db.transact([
    tx.practices[practiceId].delete(),
    tx.systemPrompts[promptId].delete()
  ]);
}

/**
 * Get all unique categories (client-side processing)
 * @param {Array} practices - Array of practices from query
 * @returns {Array<string>} Unique categories
 */
export function getCategories(practices) {
  if (!practices || practices.length === 0) return [];
  
  const categories = practices.map(p => p.category);
  return [...new Set(categories)].sort();
}

/**
 * Format practice data for display
 * @param {Object} practice - Practice from InstantDB
 * @returns {Object} Formatted practice
 */
export function formatPractice(practice) {
  return {
    id: practice.id,
    title: practice.title,
    description: practice.description,
    tags: practice.tags || [],
    category: practice.category,
    systemPrompt: practice.systemPrompt?.content || null,
    systemPromptId: practice.systemPrompt?.id || null,
    createdAt: practice.createdAt,
    updatedAt: practice.updatedAt
  };
}
