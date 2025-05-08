import { useBookmarkContext } from '../lib/hooks.ts';
import { JobList } from './JobList.tsx';

export function BookmarksPopover() {
  const { bookmarkedJobItems, isLoading } = useBookmarkContext();

  return (
    <div className="bookmarks-popover">
      <JobList
        jobs={bookmarkedJobItems}
        isLoading={isLoading}
        classNames="tiny"
      />
    </div>
  );
}
