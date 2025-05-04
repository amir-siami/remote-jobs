import { useEffect, useState } from 'react';
import { JobItemApiResponse, JobsApiResponse } from './types.ts';
import { BASE_API_URL } from './constants.ts';
import { useQuery } from '@tanstack/react-query';

export type ApiError = {
  message: string;
};

async function fetchJobItem(id: number): Promise<JobItemApiResponse> {
  const res = await fetch(`${BASE_API_URL}/${id}`);
  if (!res.ok) {
    const error: ApiError = await res.json();
    throw new Error(error.message);
  }
  return await res.json();
}

async function fetchJobData(searchTerm: string): Promise<JobsApiResponse> {
  const res = await fetch(`${BASE_API_URL}?search=${searchTerm}`);
  if (!res.ok) {
    const error: ApiError = await res.json();
    throw new Error(error.message);
  }
  return await res.json();
}

export function useFetchData(searchTerm: string) {
  const { data, isInitialLoading, error, isError } = useQuery(
    ['jobs', searchTerm],
    () => fetchJobData(searchTerm),
    {
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(searchTerm),
    }
  );
  return {
    jobItems: data?.jobItems,
    isLoading: isInitialLoading,
    error,
    isError,
  } as const;
}

export function useFetchJobItem(id: number | null) {
  const { data, isInitialLoading, error, isError } = useQuery(
    ['job-item', id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
    }
  );
  return {
    jobItem: data?.jobItem,
    isLoading: isInitialLoading,
    error,
    isError,
  } as const;
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
