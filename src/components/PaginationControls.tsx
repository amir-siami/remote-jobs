import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { PageDirection } from '../lib/types.ts';
import { useJobItemsContext } from '../lib/hooks.ts';

export function PaginationControls() {
  const { handlePageChange, currentPage, pages } = useJobItemsContext();
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onPageChange={() => handlePageChange('previous')}
          direction="previous"
          currentPage={currentPage}
        />
      )}
      {pages > currentPage && (
        <PaginationButton
          onPageChange={() => handlePageChange('next')}
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
