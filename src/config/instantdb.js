import { init } from '@instantdb/react';

// InstantDB App ID
const APP_ID = '6d871603-afb3-4232-94a2-649397647a60';

// Initialize InstantDB
// Note: Schema is defined and managed in the InstantDB dashboard
// User profiles will have: email, displayName, photoURL, role, createdAt
const db = init({ 
  appId: APP_ID
});

export default db;
