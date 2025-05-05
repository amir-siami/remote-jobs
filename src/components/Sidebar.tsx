import { ResultsCount } from './ResultsCount.tsx';
import { SortingControls } from './SortingControls.tsx';
import { JobList } from './JobList.tsx';
import { PaginationControls } from './PaginationControls.tsx';
import { JobItem, PageDirection, SortBy } from '../lib/types.ts';

type SidebarProps = {
  data: JobItem[];
  isLoading: boolean;
  jobItemsCount: number;
  handlePageChange: (direction: PageDirection) => void;
  currentPage: number;
  pageSize: number;
  onSortByChange: (text: SortBy) => void;
  sortBy: SortBy;
};
export function Sidebar({
  data,
  isLoading,
  jobItemsCount,
  handlePageChange,
  currentPage,
  pageSize,
  onSortByChange,
  sortBy,
}: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount totalNumberOfResults={jobItemsCount} />
        <SortingControls onClick={onSortByChange} sortBy={sortBy} />
      </div>
      <JobList jobs={data} isLoading={isLoading} />
      <PaginationControls
        onPageChange={handlePageChange}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </div>
  );
}
