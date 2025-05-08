import { JobListItem } from './JobListItem.tsx';
import { Spinner } from './Spinner.tsx';
import { JobListProps } from '../lib/types.ts';

export function JobList({ jobs, isLoading, classNames }: JobListProps) {
  return (
    <ul className="job-list">
      {isLoading && <Spinner classNames={classNames} />}
      {!isLoading && jobs.map((job) => <JobListItem job={job} key={job.id} />)}
    </ul>
  );
}
