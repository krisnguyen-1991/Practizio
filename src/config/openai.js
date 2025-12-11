// OpenAI Configuration
// The API key is loaded from environment variables

export const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

// Validate that the API key is present
if (!OPENAI_API_KEY) {
  console.error('OpenAI API key is not configured. Please add REACT_APP_OPENAI_API_KEY to your .env file');
}

export const openaiConfig = {
  apiKey: OPENAI_API_KEY,
  baseURL: 'https://api.openai.com/v1',
};

export default openaiConfig;

