import React, { createContext, useContext } from 'react';
import PickSorter from './BestPicksSorter';

const PickSorterContext = createContext();

export const PickSorterProvider = ({ children }) => {
  const pickSorter = new PickSorter(); // Create an instance of PickSorter

  return (
    <PickSorterContext.Provider value={pickSorter}>
      {children}
    </PickSorterContext.Provider>
  );
};

export const usePickSorter = () => {
  const context = useContext(PickSorterContext);
  if (!context) {
    throw new Error('usePickSorter must be used within a PickSorterProvider');
  }
  return context;
};
