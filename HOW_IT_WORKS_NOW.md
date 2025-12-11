# 🎯 How Your Practice System Now Works

## ✅ Complete Flow

### 1. User Browses Practices (`/`)
- **Component:** `BrowsePage.jsx`
- **Data Source:** InstantDB (fetches all practices in real-time)
- **What happens:**
  - Uses `useAllPractices()` hook to fetch practices from InstantDB
  - Displays all practices with their titles, descriptions, tags, and categories
  - Each practice card shows data directly from your database

### 2. User Clicks "Start Learning"
- **Navigates to:** `/lesson/:practiceId`
- **Component:** `LessonPage.jsx`
- **What happens:**
  - Uses `usePracticeById(practiceId)` to fetch the specific practice
  - Shows lesson content and instructions
  - When user clicks "Start Practicing", navigates to practice session

### 3. Practice Session Starts (`/practice-session?practiceId=...`)
- **Component:** `PracticePage.jsx`
- **What happens:**
  1. **Fetches Practice & System Prompt:**
     ```javascript
     const { data } = usePracticeById(practiceId);
     const practice = data?.practices?.[0];
     const systemPrompt = practice?.systemPrompt?.content;
     ```
  
  2. **Generates Question:**
     - Sends system prompt to `/api/practice/generate`
     - OpenAI uses the practice's custom system prompt
     - Returns a question specific to that practice type
  
  3. **User Answers:**
     - User types or speaks their answer
     - Clicks "Get Feedback"
  
  4. **Gets AI Feedback:**
     - Sends answer + system prompt to `/api/practice/review`
     - OpenAI uses the same system prompt to provide feedback
     - Returns personalized feedback based on that practice's teaching style

## 🗄️ Data Structure

### In InstantDB:

**Practice:**
```json
{
  "id": "uuid-here",
  "title": "Tell Me About",
  "description": "Learn how to transform closed questions...",
  "tags": ["communication skills"],
  "category": "Communication",
  "systemPrompt": {
    "id": "prompt-uuid",
    "content": "You are a communication coach..."
  }
}
```

### How System Prompts Are Used:

**Generate Question API Call:**
```javascript
POST /api/practice/generate
{
  "systemPrompt": "You are a communication coach..." // From InstantDB
}
```

**Review Answer API Call:**
```javascript
POST /api/practice/review
{
  "studentAnswer": "Tell me about your work.",
  "originalTopic": "What do you do?",
  "systemPrompt": "You are a communication coach..." // Same prompt
}
```

## 🔄 Complete Example Flow

### Scenario: User wants to practice "Tell Me About"

1. **User visits `/` (Browse Page)**
   ```
   → Fetches from InstantDB: practices table
   → Sees "Tell Me About" card
   → Clicks "Start Learning"
   ```

2. **Navigates to `/lesson/[practice-uuid]`**
   ```
   → Fetches practice with ID from InstantDB
   → Shows lesson content
   → User clicks "Start Practicing"
   ```

3. **Navigates to `/practice-session?practiceId=[uuid]`**
   ```
   → Fetches practice + system prompt from InstantDB
   → Automatically calls API with system prompt:
     POST /api/practice/generate
     { "systemPrompt": "You are a communication coach..." }
   
   → Receives question:
     { "closedQuestion": "Do you enjoy cooking?",
       "experienceMapHint": "choose recipe → gather ingredients → ..." }
   ```

4. **User Types Answer**
   ```
   User writes: "Tell me about your cooking experiences."
   → Clicks "Get Feedback"
   ```

5. **Gets AI Feedback**
   ```
   → Calls API with system prompt:
     POST /api/practice/review
     {
       "studentAnswer": "Tell me about your cooking experiences.",
       "originalTopic": "Do you enjoy cooking?",
       "systemPrompt": "You are a communication coach..."
     }
   
   → Receives feedback:
     {
       "feedback": "Great job! You transformed...",
       "additionalExamples": [...]
     }
   ```

## 🎨 Key Features

### ✅ Each Practice Has Its Own AI Personality
- "Tell Me About" practice = "Tell me about" coaching style
- Future practices can have completely different coaching styles
- All controlled by the system prompt in InstantDB

### ✅ Real-Time Updates
- If you update a practice in InstantDB, it updates immediately
- No need to restart the app
- Changes reflect instantly for all users

### ✅ Easy to Add New Practices
Just create a new practice in InstantDB with:
- Title
- Description  
- Tags
- Category
- System Prompt (defines how AI behaves)

## 📝 No More File-Based System Prompts!

**Before:**
- System prompt in `server/system-prompt.txt`
- Same prompt for all practices
- Had to restart server to update

**Now:**
- System prompt in InstantDB
- Different prompt for each practice
- Updates instantly, no restart needed
- Linked 1-to-1 with each practice

## 🚀 Benefits

1. **Scalable:** Add unlimited practices with unique AI behaviors
2. **Real-time:** Changes reflect immediately
3. **Maintainable:** Edit prompts through database, not code
4. **Flexible:** Each practice can teach differently
5. **No Files:** Everything in cloud database

---

**Your system is now fully integrated with InstantDB! 🎉**

Each practice fetches its own system prompt and uses it for personalized AI coaching.
