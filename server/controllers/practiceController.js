import openai from '../config/openai.js';
import { loadSystemPrompt } from '../utils/loadSystemPrompt.js';

/**
 * Generate a new practice question with hints
 * POST /api/practice/generate
 * Body: { systemPrompt?: string } - Optional custom system prompt from database
 */
export async function generatePracticeQuestion(req, res) {
  try {
    // Use custom system prompt if provided, otherwise load from file
    const systemPrompt = req.body.systemPrompt || loadSystemPrompt();
    
    // Add randomness to ensure different questions each time
    const timestamp = Date.now();
    const randomSeed = Math.floor(Math.random() * 1000000);
    
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Generate a practice question (mode: generate). 

Session ID: ${timestamp}-${randomSeed}

CRITICAL: Request #${randomSeed} - Generate a COMPLETELY UNIQUE, CREATIVE, and INTERESTING question!

BE CREATIVE AND SPECIFIC:
- Avoid generic patterns like "Do you like [thing]?"
- Think of specific, concrete, interesting scenarios
- Use varied question structures
- Ask about memorable experiences, not just preferences
- Be playful, surprising, or thought-provoking

INSPIRATION - Here are example styles (create NEW questions, don't copy these):
• "What's the most adventurous food you've ever tried?"
• "Have you ever binge-watched an entire TV series in one weekend?"
• "What's your go-to song when you need a mood boost?"
• "When was the last time you laughed until you cried?"
• "Where's your favorite spot to watch the sunset?"
• "Do you have any quirky habits nobody knows about?"
• "What's the best piece of advice you've ever received?"
• "Have you ever met someone famous?"
• "What's something you were terrible at but kept doing anyway?"
• "When you were 10 years old, what was your favorite thing to do?"

VARY YOUR TOPICS:
Rotate through: childhood memories, daily routines, special experiences, skills, preferences, dreams, routines, challenges, achievements, creative outlets, social activities, nature, entertainment, food experiences, travel moments, learning experiences, etc.

Create ONE engaging question that's:
- Specific and concrete (not vague)
- Interesting and unique
- Natural and conversational
- Easy to understand

Then transform it into a "Tell me about..." statement and provide an experience map hint.

Return ONLY valid JSON with no additional text, following this exact format:
{
  "closedQuestion": "ONE creative, specific, interesting question here (avoid 'Do you like...' patterns!)",
  "experienceMapHint": "imperative verb → verb → verb → verb → verb → verb (NO step numbers, use commands like: choose, order, eat, share, reflect)"
}

IMPORTANT: experienceMapHint must use imperative verbs (choose, find, start, etc.) NOT gerunds (choosing, finding, starting). NO "step 1:", "step 2:" numbering!`
        }
      ],
      temperature: 1.0,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);
    
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error generating practice question:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate practice question',
      message: error.message
    });
  }
}

/**
 * Review student's answer and provide feedback
 * POST /api/practice/review
 * Body: { studentAnswer: string, originalTopic: string, systemPrompt?: string }
 */
export async function reviewStudentAnswer(req, res) {
  try {
    const { studentAnswer, originalTopic, systemPrompt: customPrompt } = req.body;

    if (!studentAnswer) {
      return res.status(400).json({
        success: false,
        error: 'Student answer is required'
      });
    }

    // Use custom system prompt if provided, otherwise load from file
    const systemPrompt = customPrompt || loadSystemPrompt();

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: `Review this student's open-ended question(s) (mode: review).
          
Original topic context: ${originalTopic || 'general conversation'}
Student's input: "${studentAnswer}"

IMPORTANT: If the student provided MULTIPLE "Tell me about" questions (check for multiple lines, numbered lists, or comma-separated questions), polish ALL of them and return all polished versions.

Instructions:
1. Polish their input to be more engaging and conversational
2. CRITICAL: Ensure ALL outputs follow the "Tell me about..." format - they must be STATEMENTS, not questions
3. NEVER use question marks - always end with periods
4. NEVER use question words like "What", "How", "Why", "Which", "Can you" - only use "Tell me about..."
5. If multiple inputs: return ALL corrected versions (separated by line breaks like: "1. Tell me about...\n2. Tell me about...\n3. Tell me about...")
6. If single input: return one corrected version
7. Provide 3 additional alternative "Tell me about..." statements exploring different parts of the experience map

Examples of CORRECT format:
✓ "Tell me about your favorite book."
✓ "Tell me about the lessons you've learned from reading."
✓ "Tell me about a book that changed your life."

Examples of WRONG format (NEVER do this):
✗ "What is your favorite book?"
✗ "How has reading impacted you?"
✗ "Can you describe a memorable character?"

Return ONLY valid JSON with no additional text, following this exact format:
{
  "correctedVersion": "Polished 'Tell me about...' STATEMENT(s) ending with period(s), NOT questions. If multiple, include ALL like: '1. Tell me about...\n2. Tell me about...'",
  "additionalExamples": [
    "Tell me about [alternative statement 1 - end with period, not question mark].",
    "Tell me about [alternative statement 2 - end with period, not question mark].",
    "Tell me about [alternative statement 3 - end with period, not question mark]."
  ],
  "feedback": "Brief positive feedback. If multiple submitted, acknowledge their effort."
}`
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error reviewing student answer:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to review answer',
      message: error.message
    });
  }
}

