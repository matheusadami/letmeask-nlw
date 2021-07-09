import { useState, useEffect, createContext, ReactNode } from "react";

import { auth, firebase } from '../services/firebase';

type UserType = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user?: UserType;
  googleSignIn: () => Promise<void>;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        saveUserFromGoogle(user);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const response = await auth.signInWithPopup(provider);
    
    if (response.user) {
      saveUserFromGoogle(response.user);
    }
  }

  function saveUserFromGoogle(user: firebase.User) {
    const { displayName, photoURL, uid } = user;

    if (!displayName || !photoURL) {
      throw new Error("Missing information from Google Account");
    }

    setUser({
      id: uid,
      name: displayName,
      avatar: photoURL
    });
  }

  return (
    <AuthContext.Provider value={{ user, googleSignIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};
