import { ResultsCount } from './ResultsCount.tsx';
import { SortingControls } from './SortingControls.tsx';
import { JobList } from './JobList.tsx';
import { PaginationControls } from './PaginationControls.tsx';
import { JobItem } from '../lib/types.ts';

type SidebarProps = {
  data: JobItem[];
  isLoading: boolean;
  jobItemsCount: number;
};
export function Sidebar({ data, isLoading, jobItemsCount }: SidebarProps) {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ResultsCount totalNumberOfResults={jobItemsCount} />
        <SortingControls />
      </div>
      <JobList jobs={data} isLoading={isLoading} />
      <PaginationControls />
    </div>
  );
}
