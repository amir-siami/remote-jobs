import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useFetchData, useSearchContext } from '../lib/hooks.ts';
import { PAGE_SIZE } from '../lib/constants.ts';
import { JobItem, PageDirection, SortBy } from '../lib/types.ts';
import toast from 'react-hot-toast';

type JobItemsContextType = {
  jobItems: JobItem[] | undefined;
  slicedData: JobItem[];
  pages: number;
  jobItemsCount: number;
  isLoading: boolean;
  handlePageChange: (direction: PageDirection) => void;
  handleSortByChange: (sortText: SortBy) => void;
  sortBy: string;
  currentPage: number;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

const JobItemsContextProvider = ({ children }: { children: ReactNode }) => {
  const { debouncedSearchText } = useSearchContext();
  const { jobItems, isLoading, error } = useFetchData(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'relevant' | 'recent'>('relevant');
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])]?.sort((a, b) => {
        if (sortBy === 'relevant') {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [jobItems, sortBy]
  );

  const jobItemsCount = jobItems?.length || 0;

  const slicedData = useMemo(
    () =>
      jobItemsSorted?.slice(
        currentPage * PAGE_SIZE - PAGE_SIZE,
        currentPage * PAGE_SIZE
      ),
    [jobItemsSorted, currentPage]
  );

  const pages = Math.ceil(jobItemsCount / PAGE_SIZE);

  const handlePageChange = useCallback((direction: PageDirection) => {
    if (direction === 'next') {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'previous') {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleSortByChange = useCallback((sortText: SortBy) => {
    setCurrentPage(1);
    setSortBy(sortText);
  }, []);

  if (error && error instanceof Error) {
    toast.error(`Error: ${error.message}`);
  }

  const contextValue = useMemo(
    () => ({
      jobItems,
      slicedData,
      jobItemsCount,
      pages,
      isLoading,
      sortBy,
      currentPage,
      handlePageChange,
      handleSortByChange,
    }),
    [
      jobItems,
      slicedData,
      jobItemsCount,
      pages,
      isLoading,
      sortBy,
      currentPage,
      handlePageChange,
      handleSortByChange,
    ]
  );
  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
};

export default JobItemsContextProvider;
