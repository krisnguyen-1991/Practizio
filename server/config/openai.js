import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables from server/.env
dotenv.config();

// Validate API key
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

if (!apiKey) {
  console.error('ERROR: OpenAI API key not found in environment variables');
  console.error('Please ensure REACT_APP_OPENAI_API_KEY is set in your .env file');
  process.exit(1);
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: apiKey,
});

export default openai;

