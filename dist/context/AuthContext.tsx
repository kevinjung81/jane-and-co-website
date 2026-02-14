import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import firebase from 'firebase/compat/app';
import { auth, googleProvider, db } from '../services/firebase';

interface AuthContextType {
  user: firebase.User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setError(null);
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const user = result.user;
      
      if (user) {
        // Store user data in Firestore using compat syntax
        const userRef = db.collection('users').doc(user.uid);
        const userSnap = await userRef.get();
        
        if (!userSnap.exists) {
          await userRef.set({
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            createdAt: new Date().toISOString(),
            role: 'client' // Default role
          });
        }
      }
    } catch (err: any) {
      console.error("Firebase Auth Error:", err);
      // Fallback for demo purposes if keys aren't set up
      if (err.code === 'auth/configuration-not-found' || err.code === 'auth/api-key-not-valid-please-pass-a-valid-api-key' || err.code === 'auth/invalid-api-key') {
         setError("Demo Mode: Firebase keys missing. Authentication simulated.");
         // Simulate login for UI demo
         const mockUser = {
             uid: 'demo-123',
             displayName: 'Jane Doe',
             email: 'jane@example.com',
             photoURL: 'https://ui-avatars.com/api/?name=Jane+Doe&background=0ABAB5&color=fff'
         } as unknown as firebase.User;
         setUser(mockUser);
      } else {
        setError(err.message);
      }
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null); // Explicitly clear for demo fallback
    } catch (err: any) {
      console.error("Logout Error:", err);
      setError(err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGoogle, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};