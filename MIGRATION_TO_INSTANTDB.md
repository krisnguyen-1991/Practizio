# Migration to InstantDB - Step by Step Guide

## 🎯 Overview

We're migrating the practices database from local JSON files to InstantDB for:
- ✅ Real-time updates across all clients
- ✅ No server-side database management needed
- ✅ Built-in authentication integration
- ✅ Automatic data syncing

## 📋 Migration Steps

### Step 1: Install Dependencies

```bash
npm install @instantdb/core
```

### Step 2: Add Schema to InstantDB Dashboard

1. Go to: https://instantdb.com/dash
2. Select your **Practizio** app (ID: `6d871603-afb3-4232-94a2-649397647a60`)
3. Click **"Schema"** in the left sidebar
4. Click **"Edit Schema"** button
5. Copy the schema from `INSTANTDB_SCHEMA.md` and paste it
6. Click **"Save Schema"**

**The schema creates:**
- `practices` table (title, description, tags, category)
- `systemPrompts` table (content)
- 1-to-1 link between them

### Step 3: Seed the Database

After adding the schema, run:

```bash
npm run seed-instantdb
```

This will create 2 initial practices:
1. **Conversation Basics** - For beginners
2. **Experience Mapping** - Intermediate level

### Step 4: Update Your Components

**OLD WAY (Server API):**
```javascript
const response = await fetch('/api/mini-practices/1');
const { data } = await response.json();
```

**NEW WAY (InstantDB - Real-time!):**
```javascript
import { usePracticeById } from './utils/instantdb-practices';

function MyComponent() {
  const { data, isLoading } = usePracticeById('practice-id-here');
  
  if (isLoading) return <div>Loading...</div>;
  
  const practice = data.practices[0];
  console.log(practice.title);
  console.log(practice.systemPrompt.content);
}
```

### Step 5: Available Utilities

Located in `src/utils/instantdb-practices.js`:

**Query Hooks (Real-time):**
- `useAllPractices()` - Get all practices
- `usePracticeById(id)` - Get one practice
- `usePracticesByCategory(category)` - Filter by category
- `useSearchPractices(term)` - Search practices

**Mutation Functions:**
- `createPractice(data, promptContent)` - Create new practice
- `updatePractice(id, updates)` - Update practice
- `updateSystemPrompt(id, content)` - Update prompt
- `deletePractice(practiceId, promptId)` - Delete practice

**Helper Functions:**
- `getCategories(practices)` - Extract unique categories
- `formatPractice(practice)` - Format for display

## 📊 Data Structure

**Practice Object:**
```javascript
{
  id: "uuid",
  title: "Conversation Basics",
  description: "Master the art...",
  tags: ["beginner", "conversation"],
  category: "Communication Skills",
  systemPrompt: {
    id: "uuid",
    content: "You are a coach..."
  },
  createdAt: 1234567890,
  updatedAt: 1234567890
}
```

## 🔄 Migration Benefits

### Before (JSON Files):
- ❌ Manual file management
- ❌ No real-time updates
- ❌ Server-side only
- ❌ Manual backups needed

### After (InstantDB):
- ✅ Automatic cloud storage
- ✅ Real-time sync across devices
- ✅ Query directly from React
- ✅ Built-in permissions system
- ✅ Automatic backups

## 🚀 Quick Start Example

```javascript
import { useAllPractices, createPractice } from './utils/instantdb-practices';

function PracticeList() {
  const { data, isLoading } = useAllPractices();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      {data.practices.map(practice => (
        <div key={practice.id}>
          <h3>{practice.title}</h3>
          <p>{practice.description}</p>
          <span>Category: {practice.category}</span>
          {practice.systemPrompt && (
            <p>Has custom system prompt</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

## 📝 Next Steps

After migration:
1. ✅ Remove old JSON database files
2. ✅ Update components to use InstantDB hooks
3. ✅ Remove old API endpoints (optional - can keep for compatibility)
4. ✅ Test real-time updates

## 🆘 Troubleshooting

**Schema not showing up?**
- Make sure you saved the schema in InstantDB dashboard
- Refresh the page

**Seed script fails?**
- Check your InstantDB App ID is correct
- Make sure the schema was added first

**Data not updating in real-time?**
- InstantDB hooks automatically subscribe to changes
- Make sure you're using the hooks from `instantdb-practices.js`

## 📚 Resources

- [InstantDB Docs](https://www.instantdb.com/docs)
- [InstantDB Schema Guide](https://www.instantdb.com/docs/schema)
- [InstantDB React Hooks](https://www.instantdb.com/docs/react)
