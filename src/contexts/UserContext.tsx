import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BirthData {
  date: string;
  time: string;
  location: string;
  latitude: number;
  longitude: number;
}

interface UserContextType {
  birthData: BirthData | null;
  setBirthData: (data: BirthData) => void;
  selectedPersona: string;
  setSelectedPersona: (persona: string) => void;
  chatHistory: any[];
  setChatHistory: (history: any[]) => void;
  usageCount: {
    chat: number;
    voice: number;
    video: number;
  };
  incrementUsage: (type: 'chat' | 'voice' | 'video') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [birthData, setBirthData] = useState<BirthData | null>(null);
  const [selectedPersona, setSelectedPersona] = useState('Astrologer');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [usageCount, setUsageCount] = useState({
    chat: 0,
    voice: 0,
    video: 0
  });

  const incrementUsage = (type: 'chat' | 'voice' | 'video') => {
    setUsageCount(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
  };

  return (
    <UserContext.Provider value={{
      birthData,
      setBirthData,
      selectedPersona,
      setSelectedPersona,
      chatHistory,
      setChatHistory,
      usageCount,
      incrementUsage
    }}>
      {children}
    </UserContext.Provider>
  );
};