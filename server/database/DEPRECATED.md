# ⚠️ DEPRECATED - Local JSON Database

**This directory and its files are DEPRECATED.**

## Migration Notice

The practices database has been migrated to **InstantDB** for better real-time functionality and cloud storage.

### Old System (Deprecated):
- ❌ `mini-practices.json` - Local file storage
- ❌ `system-prompts.json` - Local file storage  
- ❌ `db.js` - JSON file operations
- ❌ `seed.js` - Local seeding

### New System (Active):
- ✅ InstantDB cloud database
- ✅ Real-time synchronization
- ✅ Utilities in `src/utils/instantdb-practices.js`
- ✅ Seed script: `npm run seed-instantdb`

## Migration Guide

See: `MIGRATION_TO_INSTANTDB.md` in the project root.

## What To Do

1. **Follow migration guide** to add schema to InstantDB
2. **Run seed script**: `npm run seed-instantdb`
3. **Update components** to use InstantDB utilities
4. **Optionally delete this directory** after confirming migration works

This directory can be safely deleted once you've confirmed the InstantDB migration is working.
