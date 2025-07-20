import { FaSearch } from "react-icons/fa";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center gap-2 w-full max-w-md rounded-3xl border border-purple-300/30 bg-white rounded px-3 py-2 shadow-sm focus-within:border-orange-600 focus-within:shadow-md transition">
      <FaSearch className="text-orange-600 w-5 h-5" />
      <input
        type="text"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full text-gray-700 bg-transparent focus:outline-none"
      />
    </div>
  );
};

export default Search;


