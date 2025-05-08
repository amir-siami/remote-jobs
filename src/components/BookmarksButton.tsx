import { TriangleDownIcon } from '@radix-ui/react-icons';
import { BookmarksPopover } from './BookmarksPopover.tsx';
import { useRef, useState } from 'react';
import { useClickOutside } from '../lib/hooks.ts';

export function BookmarksButton() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useClickOutside([btnRef, popoverRef], () => {
    setOpen(false);
  });

  return (
    <section>
      <button
        ref={btnRef}
        onClick={() => setOpen((prev) => !prev)}
        className="bookmarks-btn"
      >
        Bookmarks <TriangleDownIcon />
      </button>
      {open && <BookmarksPopover ref={popoverRef} />}
    </section>
  );
}
