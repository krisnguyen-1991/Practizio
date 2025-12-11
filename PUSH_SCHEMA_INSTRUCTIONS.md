# 🚀 How to Push Your Schema to InstantDB

InstantDB now uses a **file-based schema** approach. The schema is defined in `instant.schema.ts` and pushed to InstantDB using the CLI.

## ✅ I've Already Created the Schema File

The file `instant.schema.ts` in your project root now contains:
- ✅ Your existing `users`, `$files`, `$users` entities
- ✅ New `practices` entity
- ✅ New `systemPrompts` entity
- ✅ The 1-to-1 relationship link between them

## 📤 Push the Schema to InstantDB

### Option 1: Using npm script (Recommended)

```bash
npm run push-schema
```

### Option 2: Using npx directly

```bash
npx instant-cli push schema --app 6d871603-afb3-4232-94a2-649397647a60
```

### Option 3: Install InstantDB CLI globally

```bash
npm install -g instant-cli
instant-cli push schema --app 6d871603-afb3-4232-94a2-649397647a60
```

## 🔐 Authentication

The first time you run this, InstantDB will ask you to authenticate:
1. It will open a browser window
2. Log in to your InstantDB account
3. Authorize the CLI
4. Come back to the terminal

## ✅ What Happens Next

After pushing the schema:
1. The `practices` and `systemPrompts` tables will appear in your InstantDB dashboard
2. The relationship between them will be active
3. You can then run: `npm run seed-instantdb` to populate initial data

## 🎯 Complete Flow

```bash
# Step 1: Push the schema
npm run push-schema

# Step 2: Seed the database
npm run seed-instantdb
```

## 🔍 Verify It Worked

Go to https://instantdb.com/dash and:
1. Select your Practizio app
2. Click "Explorer"
3. You should now see:
   - `practices` namespace
   - `systemPrompts` namespace
   - (along with existing `$files`, `$users`, `users`)

## 📝 Making Schema Changes

If you need to modify the schema later:
1. Edit `instant.schema.ts`
2. Run `npm run push-schema` again
3. InstantDB will validate and update your schema

## 🆘 Troubleshooting

**"instant-cli not found"**
→ The npx command will auto-install it. Just run `npm run push-schema`

**"Authentication failed"**
→ Make sure you're logged into the same InstantDB account that owns this app

**"Schema validation error"**
→ Check `instant.schema.ts` for syntax errors
→ Make sure all required fields are defined

## 🎉 That's It!

Once the schema is pushed, you're ready to seed the database and start using InstantDB for your practices!
