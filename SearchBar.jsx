import React from 'react';
import { useEffect, useState } from 'react';

function SearchBar({ defaultValue, isLoading, onSearch, onUseLocation }) {
  const [location, setLocation] = useState(defaultValue);

  useEffect(() => {
    setLocation(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(location);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <label className="search__field">
        <span>City</span>
        <input
          type="search"
          value={location}
          placeholder="Search Toronto, Vancouver, Tokyo..."
          onChange={(event) => setLocation(event.target.value)}
        />
      </label>
      <div className="search__actions">
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching' : 'Search'}
        </button>
        <button type="button" className="button--ghost" onClick={onUseLocation} disabled={isLoading}>
          Use my location
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
