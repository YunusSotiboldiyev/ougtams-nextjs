'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../components/LanguageContext";
import { useCurrency } from "../components/CurrencyContext";
import Navbar from "../components/Navbar";

const SearchPage = () => {
  const { language } = useLanguage();
  const { currency } = useCurrency();
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const content = {
    ru: {
      searchPlaceholder: "Поиск...",
      searchButton: "Поиск"
    },
    uz: {
      searchPlaceholder: "Qidirish...",
      searchButton: "Qidirish"
    },
  };

  const t = content[language];

  const handleSearch = async () => {
    if (searchTerm.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      fetchSearchResults(searchTerm);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      console.log("Searching for:", query); 

      const encodedQuery = encodeURIComponent(query);
      const res = await fetch(
        `https://api.mirmakhmudoff.uz/api/search/?format=json&query=${encodedQuery}`
      );

      if (res.ok) {
        const data = await res.json();
        console.log("Fetched products:", data); 

        if (data && Array.isArray(data) && data.length > 0) {
          setSearchResults(data); 
        } else {
          setSearchResults([]);
        }
      } else {
        console.error("Error fetching search results:", res.status);
        setSearchResults([]); 
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search).get("query");
    if (query) {
      setSearchTerm(query);
      fetchSearchResults(query);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-black text-white py-12 md:px-16 mt-7">
        <h2 className="text-3xl font-bold mb-10">
          {t.searchPlaceholder}: "{searchTerm}"
        </h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="bg-zinc-800 text-white px-4 py-1.5 rounded w-[240px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded ml-4"
          >
            {t.searchButton}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.length > 0 ? (
            searchResults.map((product) => (
              <div key={product.id} className="bg-gray-800 p-4 rounded-lg">
                <img
                  src={product.image}
                  alt={product.name_uz}
                  className="w-full h-48 object-cover rounded"
                />
                <h3 className="text-lg text-white">{product.name_uz}</h3>
                <p className="text-sm text-gray-400">{product.description_uz}</p>
                <p className="text-white mt-2">Price: {product.price_uzs} UZS</p>
              </div>
            ))
          ) : (
            <p className="text-white">No results found for "{searchTerm}"</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
