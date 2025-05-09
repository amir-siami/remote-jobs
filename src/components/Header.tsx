import { Logo } from './Logo.tsx';
import { BookmarksButton } from './BookmarksButton.tsx';
import { SearchForm } from './SearchForm.tsx';

export function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>
      <SearchForm />
    </header>
  );
}
