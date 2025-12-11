# Practizio

A full-stack React application for mastering conversation skills through open-ended questions. Built with InstantDB for real-time data, user authentication, and role-based permissions.

## Features

- 🔐 **User Authentication** - Passwordless magic code login via InstantDB
- 🎯 **Conversation Practice** - Transform closed questions into open-ended conversations
- 🤖 **AI-Powered Feedback** - Uses OpenAI to generate questions and provide feedback
- 🎤 **Voice Input** - Type or speak your answers
- 💾 **Real-time Database** - InstantDB for user profiles and data storage

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key
- InstantDB account (free at https://instantdb.com)

### Installation

1. **Clone or navigate to the project:**
```bash
cd /Users/khanhnguyen/Desktop/Practizio
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Copy the example env file:
```bash
cp .env.example .env
```

Then edit `.env` and add your OpenAI API key:
```
REACT_APP_INSTANT_APP_ID=6d871603-afb3-4232-94a2-649397647a60
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

**Note:** The InstantDB App ID is already configured in the example file.

**Important:** The `.env` file is already in `.gitignore` to keep your API keys secure.

5. **Start both servers:**

Terminal 1 (Backend API):
```bash
npm run server
```

Terminal 2 (React App):
```bash
npm start
```

Or run both concurrently:
```bash
npm run dev
```

The app will open at [http://localhost:3000](http://localhost:3000)

### First Time Setup

After starting the app:

1. **Sign In**
   - Go to `/login` and enter your email
   - You'll receive a magic code via email
   - Enter the code to sign in (no password needed!)

2. **Start Practicing**
   - Click "Start Practicing" on the home page
   - Answer questions and get AI feedback

For detailed authentication setup instructions, see **[AUTHENTICATION_GUIDE.md](./AUTHENTICATION_GUIDE.md)**

## Environment Variables

This project uses environment variables to keep sensitive information secure:

- `REACT_APP_OPENAI_API_KEY` - Your OpenAI API key

**Note:** In Create React App, environment variables must be prefixed with `REACT_APP_` to be accessible in the browser.

### Using Environment Variables in Your Code

```javascript
// Import from config
import { OPENAI_API_KEY } from './config/openai';

// Or access directly
const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
```

## Project Structure

```
Practizio/
├── public/
│   └── index.html
├── server/
│   ├── config/
│   │   └── openai.js              # OpenAI configuration
│   ├── controllers/
│   │   └── practiceController.js  # API logic
│   ├── routes/
│   │   └── practice.js            # API routes
│   ├── utils/
│   │   └── loadSystemPrompt.js
│   ├── system-prompt.txt          # Default system prompt
│   └── index.js                   # Express server
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginPage.jsx      # Login page
│   │   │   └── SignupPage.jsx     # Signup page
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx # Admin interface
│   │   │   ├── PracticeForm.jsx   # Practice editor
│   │   │   └── PromptForm.jsx     # Prompt editor
│   │   ├── BrowsePage.jsx         # Browse practices
│   │   ├── ConversationPage.jsx   # Landing page
│   │   ├── PracticePage.jsx       # Practice interface
│   │   ├── ProtectedRoute.jsx     # Auth guard
│   │   └── CollapsibleHint.jsx
│   ├── config/
│   │   └── instantdb.js           # InstantDB configuration
│   ├── App.js                     # Main app with routes
│   ├── index.js
│   └── index.css
├── .env                           # Your API keys (NOT committed)
├── .env.example                   # Template for environment
├── INSTANTDB_SETUP.md            # Detailed setup guide
├── .gitignore
├── package.json
└── README.md
```

## Available Scripts

- `npm start` - Runs the React app in development mode
- `npm run server` - Runs the Express API server
- `npm run dev` - Runs both React app and API server concurrently
- `npm build` - Builds the app for production
- `npm test` - Runs tests
- `npm eject` - Ejects from Create React App (one-way operation)

## Design & Branding

The design is inspired by modern educational platforms with:
- **Color Palette**: Navy blue (#0A1F44), Coral (#FF6B4A), Orange (#FF8C42), Beige (#F5F1EA)
- **Typography**: Inter font family
- **Style**: Clean, modern, with rounded corners and good whitespace

## Security Best Practices

✅ **API keys are stored in `.env` file**  
✅ **`.env` is in `.gitignore`** to prevent committing secrets  
✅ **`.env.example` provided** as a template  
✅ **Never hardcode API keys** in your source code  

## User Roles & Permissions

### Regular Users
- Sign up and log in with magic codes
- Browse all practice exercises
- Search and filter practices
- Practice with selected or random exercises
- Receive AI-powered feedback

### Admin Users
- All regular user permissions
- Access to Admin Dashboard
- Create, edit, and delete practices
- Create, edit, and delete system prompts
- Manage practice categories and tags

## Tech Stack

### Frontend
- React 18
- React Router v6
- InstantDB React SDK
- Tailwind CSS
- Inter Font (Google Fonts)

### Backend
- Node.js + Express
- InstantDB (Database & Auth)
- OpenAI API (GPT-4)

### Infrastructure
- InstantDB (Real-time database, authentication, permissions)

## Quick Links

- **Home Page:** `/`
- **Login/Signup:** `/login`
- **Practice:** `/practice` (requires login)

## Troubleshooting

### Authentication Issues
- Make sure your `.env` file has the correct InstantDB App ID
- For Google OAuth, ensure it's configured in the InstantDB dashboard
- Restart your dev server after updating environment variables

### API Issues
- Check that your OpenAI API key is valid and has credits
- Verify the backend server is running on port 5001

## Contributing

This is a private project. For questions or issues, contact the project maintainer.

## License

This project is private and proprietary.
