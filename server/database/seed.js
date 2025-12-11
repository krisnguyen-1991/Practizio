import { MiniPractice } from '../models/MiniPractice.js';
import { SystemPrompt } from '../models/SystemPrompt.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Seed the database with initial mini practices
 */
export function seedDatabase() {
  console.log('🌱 Seeding database...');

  // Read the default system prompt
  const defaultPromptPath = path.join(__dirname, '..', 'system-prompt.txt');
  const defaultSystemPrompt = fs.readFileSync(defaultPromptPath, 'utf-8');

  // Practice 1: Conversation Basics
  const practice1Id = MiniPractice.create({
    title: 'Conversation Basics',
    description: 'Master the art of turning closed questions into engaging open-ended conversations. Practice transforming simple yes/no questions into thoughtful "Tell me about..." statements that invite deeper dialogue.',
    tags: ['beginner', 'conversation', 'open-ended questions'],
    category: 'Communication Skills'
  });

  SystemPrompt.create({
    practiceId: practice1Id,
    content: defaultSystemPrompt
  });

  console.log(`✅ Created practice: "Conversation Basics" (ID: ${practice1Id})`);

  // Practice 2: Experience Mapping
  const experienceMappingPrompt = `You are a conversation skills coach specializing in Experience Mapping - a technique that helps people explore and articulate their experiences through structured questioning.

Your role is to help students understand how to map out experiences by breaking them into sequential steps or aspects. When students practice, guide them to:

1. Identify the key moments or phases of an experience
2. Create "Tell me about..." prompts that explore each aspect
3. Ensure questions flow naturally and build on each other
4. Focus on concrete details rather than abstract concepts

RESPONSE FORMATS:

When mode is "generate":
- Generate an interesting closed question about an experience
- Provide an experience map hint that breaks the experience into 6 imperative verb steps
- Format: {"closedQuestion": "...", "experienceMapHint": "verb → verb → verb → verb → verb → verb"}

When mode is "review":
- Review the student's "Tell me about..." statements
- Ensure they're exploring different aspects of the experience
- Provide 3 alternative examples that dig deeper into the experience map
- Format: {"correctedVersion": "...", "additionalExamples": [...], "feedback": "..."}

Remember: Experience mapping is about understanding the journey, not just the destination. Help students ask questions that reveal the full story.`;

  const practice2Id = MiniPractice.create({
    title: 'Experience Mapping',
    description: 'Learn to break down experiences into meaningful moments and craft questions that explore each step. Develop the skill of creating conversation flows that naturally guide someone through their story.',
    tags: ['intermediate', 'storytelling', 'experience design'],
    category: 'Advanced Techniques'
  });

  SystemPrompt.create({
    practiceId: practice2Id,
    content: experienceMappingPrompt
  });

  console.log(`✅ Created practice: "Experience Mapping" (ID: ${practice2Id})`);

  console.log('🎉 Database seeded successfully!');
}
