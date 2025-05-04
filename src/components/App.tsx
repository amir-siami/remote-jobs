import { Background } from './Background.tsx';
import { Header } from './Header.tsx';
import { Container } from './Container.tsx';
import { Footer } from './Footer.tsx';
import { useState } from 'react';
import { useDebounce, useFetchData } from '../lib/hooks.ts';
import { JobItemContent } from './JobItemContent.tsx';
import { Sidebar } from './Sidebar.tsx';
import toast from 'react-hot-toast';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const { jobItems, isLoading, error } = useFetchData(debouncedSearchTerm);

  const jobItemsCount = jobItems?.length || 0;
  const slicedData = jobItems?.slice(0, 7) || [];

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
        />
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
