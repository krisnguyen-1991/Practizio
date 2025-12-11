# ⚠️ DEPRECATED - Local Database Models

**These model files are DEPRECATED.**

## Migration Notice

The database models have been replaced with **InstantDB utilities**.

### Old Models (Deprecated):
- ❌ `MiniPractice.js` - Local JSON operations
- ❌ `SystemPrompt.js` - Local JSON operations

### New Utilities (Active):
- ✅ `src/utils/instantdb-practices.js` - InstantDB operations

## What Changed

**Before:**
```javascript
import { MiniPractice } from './models/MiniPractice';
const practice = MiniPractice.getById(1);
```

**After:**
```javascript
import { usePracticeById } from './utils/instantdb-practices';
const { data } = usePracticeById('practice-id');
const practice = data.practices[0];
```

## Migration Guide

See: `MIGRATION_TO_INSTANTDB.md` in the project root.

These files can be safely deleted once you've confirmed the InstantDB migration is working.
