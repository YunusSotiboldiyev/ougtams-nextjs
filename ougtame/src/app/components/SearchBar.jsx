import { useState } from "react";

const SearchBar = ({ onResults }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (searchQuery.length > 2) {
      try {
        const res = await fetch(
          `https://api.mirmakhmudoff.uz/api/search/?query=${searchQuery}`
        );
        const data = await res.json();
        onResults(data); // Send data back to parent
      } catch (error) {
        console.error("Search error:", error);
      }
    } else {
      onResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search products..."
        className="bg-zinc-800 text-white px-4 py-2 rounded w-[300px]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
