import React, { useState, useEffect } from 'react';

interface SearchProps {
  setDebouncedSearch: (value: string) => void;
}
function Search({ setDebouncedSearch }: SearchProps) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      clearTimeout(id);
    };
  }, [search]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <input value={search} onChange={handleSearch} type="text" />
    </div>
  );
}

export default Search;
