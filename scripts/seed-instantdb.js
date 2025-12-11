import { init, tx, id } from '@instantdb/core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize InstantDB
const APP_ID = '6d871603-afb3-4232-94a2-649397647a60';
const db = init({ appId: APP_ID });

// Read the default system prompt
const defaultPromptPath = path.join(__dirname, '..', 'server', 'system-prompt.txt');
const defaultSystemPrompt = fs.readFileSync(defaultPromptPath, 'utf-8');

// Experience Mapping prompt
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

async function seedInstantDB() {
  console.log('🌱 Seeding InstantDB with initial practices...\n');

  try {
    // Generate IDs
    const practice1Id = id();
    const prompt1Id = id();
    
    console.log('Creating practice and system prompt...');
    
    // Create practice and system prompt separately, then link
    const practiceResult = await db.transact(
      tx.practices[practice1Id].update({
        title: 'Tell Me About',
        description: 'Learn how to transform closed questions into open-ended "Tell me about..." statements that create comfortable conversations.',
        tags: ['communication skills'],
        category: 'Communication',
        createdAt: Date.now(),
        updatedAt: Date.now()
      })
    );
    
    console.log('Practice created...');
    
    const promptResult = await db.transact(
      tx.systemPrompts[prompt1Id].update({
        content: defaultSystemPrompt,
        createdAt: Date.now(),
        updatedAt: Date.now()
      })
    );
    
    console.log('System prompt created...');
    
    // Link them together
    const linkResult = await db.transact(
      tx.practices[practice1Id].link({ systemPrompt: prompt1Id })
    );

    console.log(`\n✅ Created practice: "Tell Me About" (ID: ${practice1Id})`);
    console.log(`   - Title: Tell Me About`);
    console.log(`   - Description: Learn how to transform closed questions...`);
    console.log(`   - Tags: ["communication skills"]`);
    console.log(`   - Category: Communication`);

    console.log('\n🎉 InstantDB seeded successfully!');
    console.log('\n📋 Practice ID: ' + practice1Id);
    console.log('📋 System Prompt ID: ' + prompt1Id);
    console.log('\nYou can now query this practice in your app!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding InstantDB:', error);
    console.error('Error details:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  }
}

seedInstantDB();
