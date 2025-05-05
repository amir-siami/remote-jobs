import { Background } from './Background.tsx';
import { Header } from './Header.tsx';
import { Container } from './Container.tsx';
import { Footer } from './Footer.tsx';
import { useState } from 'react';
import { useDebounce, useFetchData } from '../lib/hooks.ts';
import { JobItemContent } from './JobItemContent.tsx';
import { Sidebar } from './Sidebar.tsx';
import toast from 'react-hot-toast';
import { PAGE_SIZE } from '../lib/constants.ts';
import { PageDirection, SortBy } from '../lib/types.ts';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const { jobItems, isLoading, error } = useFetchData(debouncedSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'relevant' | 'recent'>('relevant');

  const jobItemsSorted = [...(jobItems || [])]?.sort((a, b) => {
    if (sortBy === 'relevant') {
      return b.relevanceScore - a.relevanceScore;
    } else {
      return a.daysAgo - b.daysAgo;
    }
  });

  const jobItemsCount = jobItems?.length || 0;
  const slicedData =
    jobItemsSorted?.slice(
      currentPage * PAGE_SIZE - PAGE_SIZE,
      currentPage * PAGE_SIZE
    ) || [];

  const pages = Math.ceil(jobItemsCount / PAGE_SIZE);

  const handlePageChange = (direction: PageDirection) => {
    if (direction === 'next') {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === 'previous') {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortByChange = (sortText: SortBy) => {
    setCurrentPage(1);
    setSortBy(sortText);
  };

  if (error && error instanceof Error) {
    toast.error(`Error: ${error.message}`);
  }

  return (
    <>
      <Background />
      <Header setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <Container>
        <Sidebar
          data={slicedData}
          isLoading={isLoading}
          jobItemsCount={jobItemsCount}
          handlePageChange={handlePageChange}
          currentPage={currentPage}
          pageSize={pages}
          onSortByChange={handleSortByChange}
          sortBy={sortBy}
        />
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
