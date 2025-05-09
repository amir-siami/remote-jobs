import { createContext, ReactNode, useState } from 'react';
import { useDebounce } from '../lib/hooks.ts';

type SearchTextContextType = {
  searchText: string;
  debouncedSearchText: string;
  handleSearchTextChange: (text: string) => void;
};

export const SearchTextContext = createContext<SearchTextContextType | null>(
  null
);

const SearchTextContextProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 1000);
  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
  };

  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        handleSearchTextChange,
        debouncedSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
};

export default SearchTextContextProvider;
