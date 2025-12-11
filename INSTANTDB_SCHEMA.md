# InstantDB Schema Setup

## Step 1: Add Schema to InstantDB Dashboard

1. Go to: https://instantdb.com/dash
2. Select your **Practizio** app
3. Click **"Schema"** in the left sidebar
4. Click **"Edit Schema"** button
5. Copy and paste the schema below:

```json
{
  "entities": {
    "practices": {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "tags": "json",
      "category": "string",
      "createdAt": "number",
      "updatedAt": "number"
    },
    "systemPrompts": {
      "id": "uuid",
      "content": "string",
      "createdAt": "number",
      "updatedAt": "number"
    }
  },
  "links": {
    "practicePrompt": {
      "forward": {
        "on": "practices",
        "has": "one",
        "label": "systemPrompt"
      },
      "reverse": {
        "on": "systemPrompts",
        "has": "one",
        "label": "practice"
      }
    }
  }
}
```

6. Click **"Save Schema"**

## What This Schema Creates

### Entities (Tables)

**practices:**
- `id` - Unique identifier (UUID)
- `title` - Practice name
- `description` - What the practice teaches
- `tags` - Array of tags (JSON)
- `category` - Category name
- `createdAt` / `updatedAt` - Timestamps

**systemPrompts:**
- `id` - Unique identifier (UUID)
- `content` - The full system prompt text
- `createdAt` / `updatedAt` - Timestamps

### Link (Relationship)

**practicePrompt:** Creates a 1-to-1 relationship
- Each `practice` has ONE `systemPrompt`
- Each `systemPrompt` belongs to ONE `practice`

## Step 2: Seed Initial Data

After adding the schema, run:

```bash
npm run seed-instantdb
```

This will create the 2 initial practices in InstantDB.

## Querying Data

### Get all practices with system prompts:
```javascript
import db from './config/instantdb';

const { data } = db.useQuery({
  practices: {
    systemPrompt: {}
  }
});
```

### Get practice by ID:
```javascript
const { data } = db.useQuery({
  practices: {
    $: {
      where: {
        id: practiceId
      }
    },
    systemPrompt: {}
  }
});
```

### Search practices:
```javascript
const { data } = db.useQuery({
  practices: {
    $: {
      where: {
        title: { $like: `%${searchTerm}%` }
      }
    }
  }
});
```

## Next Steps

1. ✅ Add schema to InstantDB dashboard
2. ✅ Run seed script
3. ✅ Use the new API utilities in your components
