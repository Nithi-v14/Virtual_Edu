import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  username: string;
  grade: number;
  points: number;
  level: number;
  badges: string[];
  achievements: string[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, grade: number) => Promise<boolean>;
  logout: () => void;
  updateUserProgress: (points: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string, grade: number): Promise<boolean> => {
    // Mock authentication - in real app, this would connect to backend
    if (username && password) {
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        grade,
        points: 850,
        level: 5,
        badges: ['first-quiz', 'math-star', 'science-explorer'],
        achievements: ['Early Learner', 'Quick Thinker', 'Science Enthusiast']
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProgress = (newPoints: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        points: user.points + newPoints,
        level: Math.floor((user.points + newPoints) / 200) + 1
      };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserProgress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};