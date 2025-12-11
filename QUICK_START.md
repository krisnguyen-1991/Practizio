# Quick Start Guide

## ✅ Your app is ready to use with email/password authentication!

### Step 1: Set up environment variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Then add your OpenAI API key:

```env
REACT_APP_INSTANT_APP_ID=6d871603-afb3-4232-94a2-649397647a60
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

### Step 2: Start the development servers

```bash
npm run dev
```

This will start both:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

### Step 3: Test authentication

1. Open http://localhost:3000
2. Click **"Login"**
3. Enter your email address
4. Click **"Send Magic Code"**
5. Check your email for a 6-digit code
6. Enter the code and click **"Verify & Sign In"**
7. You'll be redirected to the practice page!

### Step 4: Verify it works

- Check the user menu in the top right corner
- Your email should be displayed
- Click on it to see the dropdown menu
- Try signing out and signing back in

## 🎉 That's it! You're ready to use your app!

## Authentication Method

The app uses **passwordless magic code authentication** via InstantDB:
- No passwords to remember
- Secure 6-digit codes sent via email
- Codes expire after a short time
- Simple and secure
- Works out of the box

If you want to add OAuth providers (Google, GitHub, etc.) in the future, you can configure them in the InstantDB dashboard and update the LoginPage component.

## Troubleshooting

### "Cannot find module '@instantdb/react'"
Run: `npm install`

### No .env file
Copy `.env.example` to `.env` and add your OpenAI API key

### Port already in use
Stop any other processes using ports 3000 or 5001

### User profile not created
Check the browser console for errors. The profile is created automatically by the `useUserProfile` hook.

## Next Steps

- ✅ Test email/password authentication
- ✅ Try creating multiple accounts
- ✅ Test the practice page features
- 📖 Read `MIGRATION_SUMMARY.md` for complete details
- 🔧 Optionally add OAuth providers later if needed

---

**Happy coding! 🚀**
