import { createContext, ReactNode } from 'react';
import { useHashChange } from '../lib/hooks.ts';

type ActiveIdContextType = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContextType | null>(null);

const ActiveIdContextProvider = ({ children }: { children: ReactNode }) => {
  const activeId = useHashChange();

  return (
    <ActiveIdContext.Provider
      value={{
        activeId,
      }}
    >
      {children}
    </ActiveIdContext.Provider>
  );
};

export default ActiveIdContextProvider;
