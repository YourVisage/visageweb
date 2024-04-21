'use client'

import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userToken: string | null;
  setUserToken: React.Dispatch<React.SetStateAction<string | null>>;
}

// Define the shape of props for AuthProvider
interface AuthProviderProps {
  children: ReactNode; // ReactNode type includes any React elements, such as JSX
}

// Initialize the context with default values
const AuthContext = createContext<AuthContextType>({
  userToken: null,
  setUserToken: () => {}
});

// Define a context provider component to wrap your application
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [userToken, setUserToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children} {/* Render children */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
