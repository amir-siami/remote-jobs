export type SearchFormProps = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

export function SearchForm({ searchTerm, setSearchTerm }: SearchFormProps) {
  return (
    <form className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
