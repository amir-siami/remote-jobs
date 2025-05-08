import { TriangleDownIcon } from '@radix-ui/react-icons';
import { BookmarksPopover } from './BookmarksPopover.tsx';
import { useState } from 'react';

export function BookmarksButton() {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>
      {open && <BookmarksPopover />}
    </section>
  );
}
