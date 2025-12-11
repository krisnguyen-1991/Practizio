import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Load the system prompt from the system-prompt.txt file
 * This ensures the prompt is never hardcoded in the application
 */
export function loadSystemPrompt() {
  try {
    const promptPath = join(__dirname, '../system-prompt.txt');
    const prompt = readFileSync(promptPath, 'utf-8');
    return prompt;
  } catch (error) {
    console.error('Error loading system prompt:', error);
    throw new Error('Failed to load system prompt file');
  }
}

export default loadSystemPrompt;

