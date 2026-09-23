export default function SearchBar({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center justify-center gap-2"
    >
      <input
        onChange={(e) => onSearch(e.target.value)}
        type="text"
        placeholder="Search movies..."
        className="border w-40 md:w-xs border-gray-300 dark:border-[#444444] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-gray-400 dark:bg-[#343434] text-white rounded-md py-2 px-4 hover:bg-gray-500 dark:hover:bg-[#404040] focus:outline-none focus:ring-2 focus:ring-[#343434] dark:focus:ring-white"
      >
        Search
      </button>
    </form>
  );
}
