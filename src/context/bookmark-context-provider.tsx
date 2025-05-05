import { createContext, ReactNode } from 'react';
import { useLocalStorage } from '../lib/hooks.ts';

type BookmarkContextType = {
  handleToggleBookmark: (id: number) => void;
  bookmarkedIds: number[];
};

export const BookmarkContext = createContext<BookmarkContextType | null>(null);

const BookmarkContextProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    'bookmarkedIds',
    []
  );

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
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export default BookmarkContextProvider;
