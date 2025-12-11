# Mini Practices Database

This document describes the database structure for storing mini practice exercises and their associated system prompts.

## Database Structure

The application uses a JSON-based file storage system with two main data tables:

### 1. Mini Practices Table (`mini-practices.json`)

Stores all mini practice exercises.

**Schema:**
```json
{
  "id": integer (auto-increment),
  "title": string,
  "description": string,
  "tags": array of strings,
  "category": string,
  "created_at": ISO datetime string,
  "updated_at": ISO datetime string
}
```

**Example:**
```json
{
  "id": 1,
  "title": "Conversation Basics",
  "description": "Master the art of turning closed questions into engaging open-ended conversations.",
  "tags": ["beginner", "conversation", "open-ended questions"],
  "category": "Communication Skills",
  "created_at": "2025-12-11T07:59:38.943Z",
  "updated_at": "2025-12-11T07:59:38.944Z"
}
```

### 2. System Prompts Table (`system-prompts.json`)

Stores system prompts that define the AI behavior for each practice.

**Schema:**
```json
{
  "id": integer (auto-increment),
  "practice_id": integer (foreign key, unique),
  "content": string (the system prompt text),
  "created_at": ISO datetime string,
  "updated_at": ISO datetime string
}
```

**Relationship:**
- 1-to-1 relationship between Mini Practices and System Prompts
- Each practice has exactly one system prompt
- The `practice_id` field is unique (enforced in code)
- Deleting a practice will cascade delete its system prompt

**Example:**
```json
{
  "id": 1,
  "practice_id": 1,
  "content": "You are a communication coach teaching students...",
  "created_at": "2025-12-11T07:59:38.944Z",
  "updated_at": "2025-12-11T07:59:38.944Z"
}
```

## API Endpoints

### Mini Practices

#### Get All Practices
```
GET /api/mini-practices
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Conversation Basics",
      "description": "...",
      "tags": ["beginner", "conversation"],
      "category": "Communication Skills",
      "created_at": "...",
      "updated_at": "..."
    }
  ]
}
```

#### Get Practice by ID (with System Prompt)
```
GET /api/mini-practices/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Conversation Basics",
    "description": "...",
    "tags": ["beginner", "conversation"],
    "category": "Communication Skills",
    "systemPrompt": "You are a communication coach...",
    "systemPromptId": 1,
    "created_at": "...",
    "updated_at": "..."
  }
}
```

#### Search Practices
```
GET /api/mini-practices/search?q=conversation
```

#### Get Practices by Category
```
GET /api/mini-practices/category/Communication%20Skills
```

#### Get All Categories
```
GET /api/mini-practices/meta/categories
```

**Response:**
```json
{
  "success": true,
  "data": ["Communication Skills", "Advanced Techniques"]
}
```

#### Create Practice
```
POST /api/mini-practices
Content-Type: application/json

{
  "title": "New Practice",
  "description": "Practice description",
  "tags": ["tag1", "tag2"],
  "category": "Category Name",
  "systemPrompt": "Optional system prompt content"
}
```

#### Update Practice
```
PUT /api/mini-practices/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  "tags": ["new", "tags"],
  "category": "New Category",
  "systemPrompt": "Updated system prompt"
}
```

#### Delete Practice
```
DELETE /api/mini-practices/:id
```

## Database Operations

### Initialize Database
The database is automatically initialized when the server starts. It creates the JSON files if they don't exist.

### Seed Database
To populate the database with the initial 2 mini practices:

```bash
npm run db:seed
```

This will:
1. Initialize the database files
2. Create "Conversation Basics" practice with its system prompt
3. Create "Experience Mapping" practice with its system prompt

### Backup
The database files are located in:
- `server/database/mini-practices.json`
- `server/database/system-prompts.json`

To backup, simply copy these files to a safe location.

### Reset Database
To reset the database:
1. Delete the JSON files
2. Run `npm run db:seed` again

## Models

### MiniPractice Model (`server/models/MiniPractice.js`)

**Methods:**
- `getAll()` - Get all practices
- `getById(id)` - Get practice by ID
- `getWithSystemPrompt(id)` - Get practice with its system prompt
- `getByCategory(category)` - Get practices by category
- `search(searchTerm)` - Search practices by title/description
- `create({ title, description, tags, category })` - Create new practice
- `update(id, { title, description, tags, category })` - Update practice
- `delete(id)` - Delete practice
- `getCategories()` - Get all unique categories

### SystemPrompt Model (`server/models/SystemPrompt.js`)

**Methods:**
- `getAll()` - Get all system prompts
- `getById(id)` - Get prompt by ID
- `getByPracticeId(practiceId)` - Get prompt by practice ID
- `create({ practiceId, content })` - Create new prompt
- `update(id, { content })` - Update prompt
- `updateByPracticeId(practiceId, { content })` - Update or create prompt by practice ID
- `delete(id)` - Delete prompt
- `deleteByPracticeId(practiceId)` - Delete prompt by practice ID

## Current Practices

The database is seeded with 2 mini practices:

1. **Conversation Basics** (ID: 1)
   - Category: Communication Skills
   - Tags: beginner, conversation, open-ended questions
   - Focus: Transforming closed questions into open-ended conversations

2. **Experience Mapping** (ID: 2)
   - Category: Advanced Techniques
   - Tags: intermediate, storytelling, experience design
   - Focus: Breaking down experiences into meaningful moments

Each practice has a unique system prompt that defines how the AI should behave during that specific practice session.
