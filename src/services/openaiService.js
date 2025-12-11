// OpenAI Service - Example usage of the API key from environment variables
import { OPENAI_API_KEY } from '../config/openai';

/**
 * Example function to call OpenAI API
 * The API key is securely loaded from environment variables
 */
export const callOpenAI = async (prompt, options = {}) => {
  if (!OPENAI_API_KEY) {
    throw new Error('OpenAI API key is not configured. Please check your .env file');
  }

  const {
    model = 'gpt-3.5-turbo',
    temperature = 0.7,
    maxTokens = 150,
  } = options;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature,
        max_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

/**
 * Example: Generate conversation practice scenarios
 */
export const generateConversationPractice = async (topic) => {
  const prompt = `Generate a conversation practice scenario about ${topic}. 
  Provide an open-ended question that would help someone practice their conversation skills.`;
  
  return await callOpenAI(prompt, {
    temperature: 0.8,
    maxTokens: 200,
  });
};

export default {
  callOpenAI,
  generateConversationPractice,
};

