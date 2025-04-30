import {ResultsCount} from "./ResultsCount.tsx";
import {SortingControls} from "./SortingControls.tsx";
import {JobList} from "./JobList.tsx";
import {PaginationControls} from "./PaginationControls.tsx";

export function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__top">
          <ResultsCount/>
          <SortingControls/>
      </div>
        <JobList/>
        <PaginationControls/>
    </div>
  );
}
