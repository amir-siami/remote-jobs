import { BookmarkFilledIcon } from '@radix-ui/react-icons';
import { useBookmarkContext } from '../lib/hooks.ts';

export function BookmarkIcon({ id }: { id: number }) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarkContext();

  return (
    <button className="bookmark-btn">
      <BookmarkFilledIcon
        className={`${bookmarkedIds.includes(id) ? 'filled' : ''}`}
        onClick={(event) => {
          handleToggleBookmark(id);
          event.stopPropagation();
          event.preventDefault();
        }}
      />
    </button>
  );
}
