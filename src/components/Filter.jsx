


const Filter = ({ categories, category, setCategory }) => {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="mt-1 p-2 rounded bg-[#1e1b2e] text-gray-200"
    >
      <option value="">All</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default Filter;
