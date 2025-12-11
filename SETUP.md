# Practizio Setup Guide

## Complete Installation Instructions

### 1. Install Node.js

First, you need Node.js installed on your system.

**Download from:** https://nodejs.org/
- Get the LTS (Long Term Support) version for macOS
- Run the installer and follow the prompts
- Restart your terminal after installation

**Verify installation:**
```bash
node --version
npm --version
```

### 2. Install Backend Dependencies

Navigate to the server directory and install packages:

```bash
cd /Users/khanhnguyen/Desktop/Practizio/server
npm install
```

This will install:
- express (API server)
- cors (cross-origin support)
- dotenv (environment variables)
- openai (OpenAI API client)

### 3. Install Frontend Dependencies

Go back to the root directory and install frontend packages:

```bash
cd /Users/khanhnguyen/Desktop/Practizio
npm install
```

This will install:
- React and React DOM
- React Router (for navigation)
- React Scripts (development tools)
- Tailwind CSS (styling)

### 4. Environment Setup

The `.env` file is already created with your OpenAI API key at:
```
/Users/khanhnguyen/Desktop/Practizio/.env
```

**Important:** This file is in `.gitignore` and will not be committed to version control.

### 5. Start the Application

You have two options:

#### Option A: Run Both Servers Separately (Recommended for Development)

**Terminal 1 - Start Backend API:**
```bash
cd /Users/khanhnguyen/Desktop/Practizio/server
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd /Users/khanhnguyen/Desktop/Practizio
npm start
```

#### Option B: Run Both Together (Coming Soon)
```bash
cd /Users/khanhnguyen/Desktop/Practizio
npm run dev
```

### 6. Access the Application

Once both servers are running:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/api/health

### 7. Using the Practice Feature

1. Go to http://localhost:3000
2. Click "Start Practicing" button on the homepage
3. The system will generate a random conversation question
4. See the closed question and improved open question
5. Click "Show Hint" to see the experience map
6. Type your own version of the question
7. Click "Submit for Feedback" to get AI feedback
8. Review the corrected version and 3 additional examples
9. Click "Practice Another Question" to try a new topic

## Project Structure

```
Practizio/
├── server/                          # Backend API
│   ├── config/
│   │   └── openai.js               # OpenAI client setup
│   ├── controllers/
│   │   └── practiceController.js   # API logic
│   ├── routes/
│   │   └── practice.js             # API routes
│   ├── utils/
│   │   └── loadSystemPrompt.js     # Prompt loader
│   ├── system-prompt.txt           # AI instructions (NOT in code!)
│   ├── package.json                # Backend dependencies
│   └── index.js                    # Server entry point
│
├── src/                             # Frontend React app
│   ├── components/
│   │   ├── ConversationPage.jsx    # Landing page
│   │   ├── PracticePage.jsx        # Main practice interface
│   │   └── CollapsibleHint.jsx     # Reusable hint component
│   ├── config/
│   │   └── openai.js               # Frontend config (legacy)
│   ├── services/
│   │   └── openaiService.js        # API service (legacy)
│   ├── App.js                      # Router setup
│   ├── index.js                    # React entry point
│   └── index.css                   # Global styles
│
├── .env                             # API keys (NEVER commit!)
├── .env.example                     # Template for .env
├── .gitignore                       # Excludes .env
├── package.json                     # Frontend dependencies
└── README.md                        # Project overview
```

## API Endpoints

### POST /api/practice/generate
Generate a new practice question with hints

**Response:**
```json
{
  "success": true,
  "data": {
    "closedQuestion": "Do you cook?",
    "openQuestion": "Tell me about your cooking experiences.",
    "experienceMapHint": "choosing ingredients → shopping → preparing → cooking → serving → feedback → reflection"
  }
}
```

### POST /api/practice/review
Review student's answer and provide feedback

**Request:**
```json
{
  "studentAnswer": "Tell me about your favorite cuisine",
  "originalTopic": "Do you cook?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "correctedVersion": "Tell me about your favorite cuisine to cook.",
    "additionalExamples": [
      "Tell me about the dishes you enjoy making the most.",
      "Tell me about your cooking journey and what inspired you.",
      "Tell me about the most memorable meal you've prepared."
    ],
    "feedback": "Great start! Your question invites them to share their preferences."
  }
}
```

## Troubleshooting

### Port Already in Use
If you get "Port 3000/5000 already in use":
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

### API Key Issues
If you get OpenAI API errors:
1. Check `.env` file exists in project root
2. Verify the key starts with `sk-proj-`
3. Restart both servers after changing `.env`

### Module Not Found
If you get import errors:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# For server
cd server
rm -rf node_modules package-lock.json
npm install
```

## Security Best Practices

✅ **API key is in `.env` file**  
✅ **`.env` is in `.gitignore`**  
✅ **System prompt is in separate file**  
✅ **Backend validates all requests**  
✅ **No secrets in frontend code**  

## Next Steps

- Add user authentication
- Save practice history
- Add more question categories
- Implement progress tracking
- Add voice practice mode
- Create mobile app version

Enjoy practicing! 🎉

