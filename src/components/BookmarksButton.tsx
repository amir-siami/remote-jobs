import { TriangleDownIcon } from '@radix-ui/react-icons';

export function BookmarksButton() {
  return (
    <section>
      <button className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>
    </section>
  );
}
