import { SortBy, SortingButtonProps } from '../lib/types.ts';

type SortingControlsProps = {
  onClick: (text: SortBy) => void;
  sortBy: SortBy;
};
export function SortingControls({ onClick, sortBy }: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>
      <SortingButton
        onClick={() => onClick('relevant')}
        isActive={sortBy === 'relevant'}
        text="relevant"
      />
      <SortingButton
        onClick={() => onClick('recent')}
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
