import { BookmarkIcon } from './BookmarkIcon';
import { JobItem } from '../lib/types.ts';
import { useActiveIdContext } from '../lib/hooks.ts';

export function JobListItem({ job }: { job: JobItem }) {
  const { id, title, badgeLetters, company, daysAgo } = job;

  const { activeId } = useActiveIdContext();

  return (
    <li className={`job-item ${activeId === job.id ? 'job-item--active' : ''}`}>
      <a href={`#${id}`} className="job-item__link">
        <div className="job-item__badge">{badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{title}</h3>
          <p className="job-item__company">{company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon id={id} />
          <time className="job-item__time">{daysAgo}</time>
        </div>
      </a>
    </li>
  );
}
