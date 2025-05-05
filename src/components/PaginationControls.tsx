import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { PageDirection } from '../lib/types.ts';

type PaginationControlsProps = {
  onPageChange: (direction: PageDirection) => void;
  currentPage: number;
  pageSize: number;
};
export function PaginationControls({
  onPageChange,
  currentPage,
  pageSize,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onPageChange={() => onPageChange('previous')}
          direction="previous"
          currentPage={currentPage}
        />
      )}
      {pageSize > currentPage && (
        <PaginationButton
          onPageChange={() => onPageChange('next')}
          direction="next"
          currentPage={currentPage}
        />
      )}
    </section>
  );
}

function PaginationButton({
  onPageChange,
  direction,
  currentPage,
}: {
  onPageChange: () => void;
  direction: PageDirection;
  currentPage: number;
}) {
  return (
    <button
      className={`pagination__button pagination__button--${direction}`}
      onClick={(e) => {
        onPageChange();
        e.currentTarget.blur();
      }}
    >
      {direction === 'previous' ? (
        <>
          <ArrowLeftIcon /> Page {currentPage - 1}
        </>
      ) : (
        <>
          Page {currentPage + 1} <ArrowRightIcon />
        </>
      )}
    </button>
  );
}
