import { Logo } from './Logo.tsx';
import { BookmarksButton } from './BookmarksButton.tsx';
import { SearchForm, SearchFormProps } from './SearchForm.tsx';

export function Header({ setSearchTerm, searchTerm }: SearchFormProps) {
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
