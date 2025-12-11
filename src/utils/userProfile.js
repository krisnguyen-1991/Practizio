import db from '../config/instantdb';

/**
 * Create or update a user profile in InstantDB
 * @param {string} userId - The user's ID
 * @param {Object} profileData - Profile data to store
 * @returns {Promise} - The transaction result
 */
export const createUserProfile = async (userId, profileData) => {
  const defaultProfile = {
    email: profileData.email || '',
    displayName: profileData.displayName || profileData.email?.split('@')[0] || 'User',
    photoURL: profileData.photoURL || '',
    role: 'user',
    createdAt: Date.now(),
    ...profileData
  };

  try {
    await db.transact([
      db.tx.users[userId].update(defaultProfile)
    ]);
    return { success: true };
  } catch (error) {
    console.error('Error creating user profile:', error);
    return { success: false, error };
  }
};

/**
 * Get a user profile from InstantDB
 * @param {string} userId - The user's ID
 * @returns {Promise} - The user profile
 */
export const getUserProfile = (userId) => {
  return db.useQuery({ users: { $: { where: { id: userId } } } });
};

/**
 * Update a user profile
 * @param {string} userId - The user's ID
 * @param {Object} updates - Profile updates
 * @returns {Promise} - The transaction result
 */
export const updateUserProfile = async (userId, updates) => {
  try {
    await db.transact([
      db.tx.users[userId].update(updates)
    ]);
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error };
  }
};
