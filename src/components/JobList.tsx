import { JobListItem } from './JobListItem.tsx';
import { Spinner } from './Spinner.tsx';
import { JobListProps } from '../lib/types.ts';

export function JobList({ jobs, isLoading }: JobListProps) {
  return (
    <ul className="job-list">
      {isLoading && <Spinner />}
      {!isLoading && jobs.map((job) => <JobListItem job={job} key={job.id} />)}
    </ul>
  );
}
