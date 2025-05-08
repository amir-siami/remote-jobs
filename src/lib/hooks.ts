import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ApiResponse,
  JobItemApiResponse,
  JobItemDetails,
  JobsApiResponse,
} from './types.ts';
import { BASE_API_URL } from './constants.ts';
import { useQueries, useQuery } from '@tanstack/react-query';
import { BookmarkContext } from '../context/bookmark-context-provider.tsx';

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

async function fetchData(id: number): Promise<ApiResponse> {
  const res = await fetch(`${BASE_API_URL}/${id}`);
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

export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ['job-item', id],
      queryFn: () => fetchData(id),
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
    })),
  });
  const data = results
    .map((result) => result.data?.jobItem)
    .filter((item) => Boolean(item)) as JobItemDetails[];
  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const error = results.find((result) => result.isError)?.error;

  return [data, isLoading, isError, error] as const;
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

export function useBookmarkContext() {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error(
      'useBookmarkContext must be used within a BookmarkContextProvider'
    );
  }
  return context;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
  const [storedValueIds, setStoredValueIds] = useState<T>(() => {
    try {
      const storedValues = localStorage.getItem(key);
      if (storedValues !== null) {
        return JSON.parse(storedValues);
      }
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValueIds));
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
    }
  }, [key, storedValueIds]);

  return [storedValueIds, setStoredValueIds];
}
