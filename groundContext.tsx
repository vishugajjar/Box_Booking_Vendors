import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { GroundDetailsType } from './src/utils/types';

// Define the shape of the context value
interface GroundDataContextType {
  groundData: GroundDetailsType[];
  setGroundData: React.Dispatch<React.SetStateAction<GroundDetailsType[]>>;
  addGround: (ground: GroundDetailsType) => void;
  updateGround: (index: number, updatedGround: GroundDetailsType) => void;
  removeGround: (index: number) => void;
}

// Create the context
const GroundDataContext = createContext<GroundDataContextType | undefined>(undefined);

// Create a provider component
export const GroundDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [groundData, setGroundData] = useState<GroundDetailsType[]>([]);

  const newGround: GroundDetailsType = {
    ground: 'Ground 1',
    groundSize: '',
    groundCategory: '',
    price: 0,
    grassType: '',
    width: '',
    height: '',
    availableTime: []
  };

  useEffect(() => {
    addGround(newGround);
  }, [])

  const addGround = (ground: GroundDetailsType) => {
    setGroundData((prevGroundData) => [...prevGroundData, ground]);
  };

  const updateGround = (index: number, updatedGround: GroundDetailsType) => {
    setGroundData((prevGroundData) => 
      prevGroundData.map((g, i) => (i === index ? updatedGround : g))
    );
  };

  const removeGround = (index: number) => {
    setGroundData((prevGroundData) => prevGroundData.filter((_, i) => i !== index));
  };

  return (
    <GroundDataContext.Provider value={{ groundData, setGroundData, addGround, updateGround, removeGround }}>
      {children}
    </GroundDataContext.Provider>
  );
};

// Custom hook to use the GroundDataContext
export const useGroundData = () => {
  const context = useContext(GroundDataContext);
  if (context === undefined) {
    throw new Error('useGroundData must be used within a GroundDataProvider');
  }
  return context;
};
