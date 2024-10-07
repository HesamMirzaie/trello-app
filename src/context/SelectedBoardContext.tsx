import React, { createContext, useContext, useState, ReactNode } from 'react';
import { IBoard } from '../types/Board';

// Define the context type
interface SelectedBoardContextType {
  selectedBoard: IBoard | null;
  setSelectedBoard: (Board: IBoard | null) => void;
}

// Create the context
const SelectedBoardContext = createContext<
  SelectedBoardContextType | undefined
>(undefined);

// Create the provider component
export const SelectedBoardProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [selectedBoard, setSelectedBoard] = useState<IBoard | null>(null);

  return (
    <SelectedBoardContext.Provider value={{ selectedBoard, setSelectedBoard }}>
      {children}
    </SelectedBoardContext.Provider>
  );
};

export const useSelectedBoardContext = (): SelectedBoardContextType => {
  const context = useContext(SelectedBoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
};
