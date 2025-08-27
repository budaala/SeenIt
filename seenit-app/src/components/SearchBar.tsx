import {
  Close as CloseIcon,
  Search as SearchIcon,
  SearchOff as SearchOffIcon,
} from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";

type SearchBarProps = {
  queryInput: string;
  setQueryInput: (value: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  clearSearch: () => void;
  searchParams: URLSearchParams;
  placeholder?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  queryInput,
  setQueryInput,
  handleSearch,
  clearSearch,
  searchParams,
  placeholder,
}) => {
  const [showBar, setShowBar] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const barRef = useRef<HTMLDivElement>(null);

  // Focus input when bar unfolds
  useEffect(() => {
    if (showBar && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showBar]);

  useEffect(() => {
    if (!showBar) return;
    const handleClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setShowBar(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showBar]);

  return (
    <div className="relative flex items-center" ref={barRef}>
      <button
        type="button"
        className={`searchButton transition-transform duration-300 ease-in-out ${
          showBar ? "rotate-360" : "rotate-0"
        }`}
        aria-label="Toggle search bar"
        onClick={() => setShowBar(!showBar)}
      >
        {showBar ? <SearchOffIcon /> : <SearchIcon />}
      </button>
      <div
        className={`absolute searchBarContainer right-0 top-6 z-10 transition-all duration-300 ease-in-out overflow-hidden ${
          showBar
            ? "w-64 opacity-100 translate-x-0"
            : "w-0 opacity-0 translate-x-8 pointer-events-none"
        }`}
        style={{ minHeight: "40px" }}
      >
        <form
          onSubmit={handleSearch}
          className="flex items-center searchBar px-2 py-1"
        >
          <input
            ref={inputRef}
            id="searchInput"
            type="text"
            placeholder={placeholder}
            value={queryInput}
            className="searchInput flex-1 px-2 relative"
            onChange={(e) => setQueryInput(e.target.value)}
            style={{ minWidth: 0 }}
          />
          <button
            type="button"
            onClick={clearSearch}
            className="searchClearButton ml-1"
            aria-label="Clear search"
          >
            <CloseIcon fontSize="small" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
