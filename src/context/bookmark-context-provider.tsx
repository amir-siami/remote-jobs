import { createContext, ReactNode } from 'react';
import { useJobItems, useLocalStorage } from '../lib/hooks.ts';
import { JobItemDetails } from '../lib/types.ts';

type BookmarkContextType = {
  handleToggleBookmark: (id: number) => void;
  bookmarkedIds: number[];
  bookmarkedJobItems: JobItemDetails[];
  isLoading: boolean;
};

export const BookmarkContext = createContext<BookmarkContextType | null>(null);

const BookmarkContextProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    'bookmarkedIds',
    []
  );

  const [bookmarkedJobItems, isLoading] = useJobItems(bookmarkedIds);

  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter((bookmark) => bookmark !== id));
    } else {
      setBookmarkedIds((prevState) => [...prevState, id]);
    }
  };

  return (
    <BookmarkContext.Provider
      value={{
        handleToggleBookmark,
        bookmarkedIds,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContextProvider;
