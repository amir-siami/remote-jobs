import { Background } from './Background.tsx';
import { Header } from './Header.tsx';
import { Container } from './Container.tsx';
import { Footer } from './Footer.tsx';
import { JobItemContent } from './JobItemContent.tsx';
import { Sidebar } from './Sidebar.tsx';

function App() {
  return (
    <>
      <Background />
      <Header />
      <Container>
        <Sidebar />
        <JobItemContent />
      </Container>
      <Footer />
    </>
  );
}

export default App;
