import { useEffect, useState } from 'react';
import { JobItem, JobItemApiResponse } from './types.ts';
import { BASE_API_URL } from './constants.ts';
import { useQuery } from '@tanstack/react-query';

async function fetchJobItem(id: number): Promise<JobItemApiResponse> {
  const res = await fetch(`${BASE_API_URL}/${id}`);
  return await res.json();
}

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
  const { data, isInitialLoading } = useQuery(
    ['job-item', id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      enabled: Boolean(id),
    }
  );
  return [data?.jobItem, isInitialLoading] as const;
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
