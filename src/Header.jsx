import SearchBox from "./SearchBox";

function Header({ handleSearch }) {
  return (
    <header className="flex flex-col md:flex-row justify-between">
      <h1 className="text-5xl md:text-7xl">Posh Properties</h1>

      <SearchBox handleSearch={handleSearch} />
    </header>
  );
}

export default Header;
