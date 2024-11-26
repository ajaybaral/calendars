import { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Ensure firebase/auth is imported

export default function useAuth() {
  const [user, setUser] = useState(null);
  // const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
  
      
      setUser(user);
       // Stop loading when user is set
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [user]);

  return { user };
}
