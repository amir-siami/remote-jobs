import { useSearchContext } from '../lib/hooks.ts';

export function SearchForm() {
  const { searchText, handleSearchTextChange } = useSearchContext();
  return (
    <form className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchText}
        onChange={(e) => {
          handleSearchTextChange(e.target.value);
        }}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
