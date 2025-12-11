import { useEffect } from 'react';
import db from '../config/instantdb';
import { useAuth } from '../context/AuthContext';

/**
 * Custom hook to ensure user profile exists in database
 * Creates profile automatically if user is authenticated but has no profile
 */
export const useUserProfile = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    const ensureUserProfile = async () => {
      if (!currentUser?.id) return;

      try {
        // Query for existing profile
        const { data } = await db.queryOnce({
          users: {
            $: {
              where: {
                id: currentUser.id
              }
            }
          }
        });

        // If no profile exists, create one
        if (!data?.users || data.users.length === 0) {
          await db.transact([
            db.tx.users[currentUser.id].update({
              email: currentUser.email || '',
              displayName: currentUser.email?.split('@')[0] || 'User',
              photoURL: '',
              role: 'user',
              createdAt: Date.now()
            })
          ]);
          console.log('User profile created');
        }
      } catch (error) {
        console.error('Error ensuring user profile:', error);
      }
    };

    ensureUserProfile();
  }, [currentUser?.id, currentUser?.email]);

  return currentUser;
};
