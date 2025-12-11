import React, { useState } from 'react';
import db from '../config/instantdb';
import { tx, id } from '@instantdb/react';

/**
 * Seed Database Component
 * 
 * This component allows you to seed the InstantDB database with initial practice data.
 * 
 * Usage:
 * 1. Navigate to /seed in your browser
 * 2. Click "Seed Database" button
 * 3. The "Tell Me About" practice will be created in InstantDB
 */

// System prompt content
const defaultSystemPrompt = `You are a communication coach teaching students to craft "Tell me about..." conversation starters.

## TASK 1: GENERATE QUESTIONS (mode: generate)

Generate ONE creative closed question + an experience map.

**CRITICAL: The question must be a SINGLE question only.**
- ✅ CORRECT: "What's the most surprising dish you've ever prepared from scratch?"
- ❌ WRONG: "What's the most surprising dish you've ever prepared from scratch, and how did the process unfold?" (This has "and" connecting two questions)
- ❌ WRONG: "Have you ever traveled abroad? What was your favorite place?" (This is two separate questions)

Experience map format: "verb → verb → verb → verb → verb" (5-7 action verbs, no numbering)

Example:
- Question: "Have you ever received a gift that completely surprised you?"
- Map: "receive the gift → open it → react to the surprise → use it → remember the giver → reflect on why it mattered"

Return:
\`\`\`json
{
  "closedQuestion": "One creative question",
  "experienceMapHint": "verb → verb → verb → verb → verb"
}
\`\`\`

## TASK 2: PROVIDE FEEDBACK (mode: review)

Analyze the user's response and return the appropriate JSON:

**If the response does NOT start with "Tell me about":**
Remind them to start with "Tell me about" and provide 3 example statements.
\`\`\`json
{
  "formatReminder": "Your friendly reminder message",
  "additionalExamples": [
    "Tell me about [statement, NO question mark].",
    "Tell me about [statement, NO question mark].",
    "Tell me about [statement, NO question mark]."
  ]
}
\`\`\`

**If it starts with "Tell me about" but is NOT related to the topic:**
Ask them to use the hint map to make it relevant and provide 3 example statements.
\`\`\`json
{
  "topicReminder": "Your supportive redirect message",
  "additionalExamples": [
    "Tell me about [statement, NO question mark].",
    "Tell me about [statement, NO question mark].",
    "Tell me about [statement, NO question mark]."
  ]
}
\`\`\`

**If it starts with "Tell me about" and matches the topic:**
Praise them and provide 3 additional example statements.
\`\`\`json
{
  "feedback": "Your praise message",
  "additionalExamples": [
    "Tell me about [statement, NO question mark].",
    "Tell me about [statement, NO question mark].",
    "Tell me about [statement, NO question mark]."
  ]
}
\`\`\`

**IMPORTANT:** 
- ALWAYS include 3 additionalExamples in every response
- Each example MUST start with "Tell me about" and end with a period (.)
- NEVER use question marks (?) - these are statements, not questions

**CRITICAL EXAMPLES OF CORRECT FORMAT:**

additionalExamples should be:
1. "Tell me about themes that resonated with you in a book."
2. "Tell me about a memorable moment from a book."
3. "Tell me about a character that made an impression on you."

NOT:
1. "How has a book influenced your perspective?" ❌
2. "What was a memorable moment?" ❌
3. "Which character do you relate to?" ❌`;

const SeedDatabase = () => {
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [practiceId, setPracticeId] = useState('');

  const handleSeed = async () => {
    setIsLoading(true);
    setStatus('🌱 Starting seeding process...');

    try {
      // Generate IDs
      const newPracticeId = id();
      const promptId = id();

      setStatus('Creating practice and system prompt...');

      // Create practice, system prompt, and link them in one transaction
      await db.transact([
        tx.practices[newPracticeId].update({
          title: 'Tell Me About',
          description: 'Learn how to transform closed questions into open-ended "Tell me about..." statements that create comfortable conversations.',
          tags: ['communication skills'],
          category: 'Communication',
          createdAt: Date.now(),
          updatedAt: Date.now()
        }),
        tx.systemPrompts[promptId].update({
          content: defaultSystemPrompt,
          createdAt: Date.now(),
          updatedAt: Date.now()
        }),
        tx.practices[newPracticeId].link({ systemPrompt: promptId })
      ]);

      setPracticeId(newPracticeId);
      setStatus('✅ Database seeded successfully!');
      console.log('Practice ID:', newPracticeId);
      console.log('System Prompt ID:', promptId);
    } catch (error) {
      setStatus(`❌ Error: ${error.message}`);
      console.error('Seeding error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-practizio-beige to-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-practizio-navy mb-4">
            Seed InstantDB Database
          </h1>
          
          <p className="text-gray-600 mb-6">
            Click the button below to seed your InstantDB database with the "Tell Me About" practice.
          </p>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <p className="text-yellow-800 text-sm">
              ⚠️ <strong>Note:</strong> Only run this once. It will create a new practice each time you click.
            </p>
          </div>

          <button
            onClick={handleSeed}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-practizio-coral hover:bg-practizio-orange hover:scale-105 shadow-lg'
            }`}
          >
            {isLoading ? 'Seeding...' : 'Seed Database'}
          </button>

          {status && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm font-mono whitespace-pre-wrap">{status}</p>
              {practiceId && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
                  <p className="text-sm text-green-800">
                    <strong>Practice ID:</strong> {practiceId}
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    You can now query this practice in your app!
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-xl">
            <h2 className="text-lg font-bold text-blue-900 mb-2">What will be created:</h2>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• <strong>Practice:</strong> "Tell Me About"</li>
              <li>• <strong>Description:</strong> Learn how to transform closed questions...</li>
              <li>• <strong>Tags:</strong> ["communication skills"]</li>
              <li>• <strong>Category:</strong> Communication</li>
              <li>• <strong>System Prompt:</strong> Full coaching prompt (see console)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeedDatabase;
