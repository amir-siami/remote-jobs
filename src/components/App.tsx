import { Background } from './Background.tsx';
import { Header } from './Header.tsx';
import { Container } from './Container.tsx';
import { Footer } from './Footer.tsx';
import { useState } from 'react';
import { useDebounce, useFetchData } from '../lib/hooks.ts';
import { Sidebar } from './Sidebar.tsx';
import { JobItemContent } from './JobItemContent.tsx';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 1000);
  const { slicedData, isLoading, jobItemsLength } =
    useFetchData(debouncedSearchTerm);

  return (
    <>
      <Background />
      <Header setSearchTerm={setSearchTerm} searchTerm={searchTerm} />
      <Container>
        <Sidebar
          data={slicedData}
          isLoading={isLoading}
          jobItemsLength={jobItemsLength}
        />
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
