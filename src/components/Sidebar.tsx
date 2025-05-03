import { ResultsCount } from './ResultsCount.tsx';
import { SortingControls } from './SortingControls.tsx';
import { JobList } from './JobList.tsx';
import { PaginationControls } from './PaginationControls.tsx';
import { JobItem } from '../lib/types.ts';

type SidebarProps = {
  data: JobItem[];
  isLoading: boolean;
  jobItemsLength: number;
};

export function Sidebar({ data, isLoading, jobItemsLength }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount totalNumberOfResults={jobItemsLength} />
        <SortingControls />
      </div>
      <JobList jobs={data} isLoading={isLoading} />
      <PaginationControls />
    </div>
  );
}
