import { useEffect, useState } from 'react';
import { JobItem, JobItemDetails } from './types.ts';
import { BASE_API_URL } from './constants.ts';

export function useFetchData(searchTerm: string) {
  const [data, setData] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const jobItemsLength = data?.length || 0;
  const slicedData = data.slice(0, 7);

  useEffect(() => {
    if (!searchTerm) return;
    setIsLoading(true);

    const fetchData = async () => {
      const res = await fetch(`${BASE_API_URL}?search=${searchTerm}`);
      const data = await res.json();
      setIsLoading(false);
      setData(data.jobItems);
    };
    fetchData();
  }, [searchTerm]);

  return { slicedData, isLoading, jobItemsLength } as const;
}

export function useFetchJobItem(id: number | null) {
  const [jobDetails, setJobDetails] = useState<JobItemDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    const fetchData = async () => {
      const res = await fetch(`${BASE_API_URL}/${id}`);
      const data = await res.json();
      setIsLoading(false);
      setJobDetails(data.jobItem);
    };
    fetchData();
  }, [id]);
  return { jobDetails, isLoading } as const;
}

export function useHashChange() {
  const [hashId, setHashId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = +window.location.hash.substring(1);
      if (hash) {
        setHashId(hash);
      }
    };
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      console.log('listener removed');
    };
  }, []);
  return hashId;
}

export function useDebounce<T>(value: T, delay = 5000) {
  const [debounce, setDebounce] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounce(value);
    }, delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);
  return debounce;
}
