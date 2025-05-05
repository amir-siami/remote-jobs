import { Logo } from './Logo.tsx';
import { BookmarksButton } from './BookmarksButton.tsx';
import { SearchForm } from './SearchForm.tsx';

type HeaderProps = {
  setSearchTerm: (searchTerm: string) => void;
  searchTerm: string;
};

export function Header({ setSearchTerm, searchTerm }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </header>
  );
}
