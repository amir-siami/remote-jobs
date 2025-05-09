import { useJobItemsContext } from '../lib/hooks.ts';

export function ResultsCount() {
  const { jobItemsCount } = useJobItemsContext();
  return (
    <p className="count">
      <span className="u-bold">{jobItemsCount}</span> results
    </p>
  );
}
