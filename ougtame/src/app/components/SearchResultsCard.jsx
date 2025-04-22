const SearchResultsCard = ({ product }) => (
    <div className="bg-zinc-800 p-4 rounded shadow text-white">
      <img src={product.image} alt={product.name_uz} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg mt-2 font-bold">{product.name_uz}</h3>
      <p className="text-sm text-gray-300">{product.description_uz?.slice(0, 100)}...</p>
      <p className="mt-2 font-semibold text-pink-500">${product.price_usd}</p>
    </div>
  );
  
  export default SearchResultsCard;
  