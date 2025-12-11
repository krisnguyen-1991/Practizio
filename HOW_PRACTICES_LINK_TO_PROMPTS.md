# How Practices Link to System Prompts

## The 1-to-1 Relationship

Each practice has **exactly one** system prompt linked through the `practice_id` field.

## Current Data Structure

### Mini Practices (mini-practices.json)
```json
[
  {
    "id": 1,  ← Practice ID
    "title": "Conversation Basics",
    "category": "Communication Skills",
    ...
  },
  {
    "id": 2,  ← Practice ID
    "title": "Experience Mapping",
    "category": "Advanced Techniques",
    ...
  }
]
```

### System Prompts (system-prompts.json)
```json
[
  {
    "id": 1,
    "practice_id": 1,  ← Links to Practice ID 1 (Conversation Basics)
    "content": "You are a communication coach..."
  },
  {
    "id": 2,
    "practice_id": 2,  ← Links to Practice ID 2 (Experience Mapping)
    "content": "You are a conversation skills coach..."
  }
]
```

## How to Know Which Practice Has Which Prompt

### Method 1: Use the API (Recommended)

The API automatically joins them for you:

```javascript
// Get practice by ID - includes system prompt automatically
const response = await fetch('http://localhost:5001/api/mini-practices/1');
const { data } = await response.json();

console.log(data);
// Output:
{
  "id": 1,
  "title": "Conversation Basics",
  "description": "...",
  "tags": ["beginner", "conversation", "open-ended questions"],
  "category": "Communication Skills",
  "systemPrompt": "You are a communication coach...",  ← Automatically included!
  "systemPromptId": 1,                                 ← The prompt's ID
  "created_at": "...",
  "updated_at": "..."
}
```

### Method 2: Look at the JSON Files

1. Open `server/database/mini-practices.json` - find the practice `id`
2. Open `server/database/system-prompts.json` - find the entry where `practice_id` matches

Example:
- Practice with `id: 1` → System Prompt with `practice_id: 1`
- Practice with `id: 2` → System Prompt with `practice_id: 2`

## Visual Diagram

```
┌─────────────────────────┐         ┌──────────────────────────┐
│   Mini Practice         │         │   System Prompt          │
├─────────────────────────┤         ├──────────────────────────┤
│ id: 1                   │◄────────│ practice_id: 1           │
│ title: "Conversation    │         │ content: "You are a..."  │
│        Basics"          │         └──────────────────────────┘
│ category: "Comm Skills" │
└─────────────────────────┘

┌─────────────────────────┐         ┌──────────────────────────┐
│   Mini Practice         │         │   System Prompt          │
├─────────────────────────┤         ├──────────────────────────┤
│ id: 2                   │◄────────│ practice_id: 2           │
│ title: "Experience      │         │ content: "You are a..."  │
│        Mapping"         │         └──────────────────────────┘
│ category: "Advanced"    │
└─────────────────────────┘
```

## When You Create a New Practice

```javascript
// Option 1: Create practice with system prompt in one call
const newPractice = await fetch('http://localhost:5001/api/mini-practices', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: "Active Listening",
    description: "Learn active listening skills",
    tags: ["intermediate", "listening"],
    category: "Communication Skills",
    systemPrompt: "You are a coach teaching active listening..."  ← Include prompt here
  })
});

// The API automatically:
// 1. Creates the practice (gets id: 3)
// 2. Creates the system prompt with practice_id: 3
// 3. Links them together
```

## Summary

**You don't need to manually manage the linking!** 

✅ **Just use:** `GET /api/mini-practices/:id`

The API automatically:
1. Fetches the practice
2. Looks up its system prompt (using `practice_id`)
3. Returns them together as one object

The `practice_id` field in the system prompts table is the "foreign key" that creates the link.
