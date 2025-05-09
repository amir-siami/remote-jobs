import { SortingButtonProps } from '../lib/types.ts';
import { useJobItemsContext } from '../lib/hooks.ts';

export function SortingControls() {
  const { handleSortByChange, sortBy } = useJobItemsContext();
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        onClick={() => handleSortByChange('relevant')}
        isActive={sortBy === 'relevant'}
        text="relevant"
      />
      <SortingButton
        onClick={() => handleSortByChange('recent')}
        isActive={sortBy === 'recent'}
        text="recent"
      />
    </section>
  );
}

export function SortingButton({ onClick, isActive, text }: SortingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent' ${isActive && 'sorting__button--active'}`}
    >
      {text}
    </button>
  );
}
