import { ResultsCount } from './ResultsCount.tsx';
import { SortingControls } from './SortingControls.tsx';
import { JobList } from './JobList.tsx';
import { PaginationControls } from './PaginationControls.tsx';
import { useJobItemsContext } from '../lib/hooks.ts';

export function Sidebar() {
  const { slicedData, isLoading } = useJobItemsContext();
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount />
        <SortingControls />
      </div>
      <JobList jobs={slicedData} isLoading={isLoading} />
      <PaginationControls />
    </div>
  );
}
