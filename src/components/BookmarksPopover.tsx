import { useBookmarkContext } from '../lib/hooks.ts';
import { JobList } from './JobList.tsx';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';

export const BookmarksPopover = forwardRef<HTMLDivElement>((_, ref) => {
  const { bookmarkedJobItems, isLoading } = useBookmarkContext();

  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList
        jobs={bookmarkedJobItems}
        isLoading={isLoading}
        classNames="tiny"
      />
    </div>,
    document.body
  );
});
