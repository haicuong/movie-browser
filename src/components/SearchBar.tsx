import { Input } from "@/components/ui/input";

export default function SearchBar({
  searchQuery,
  onSearch,
}: {
  searchQuery: string;
  onSearch: (query: string) => void;
}) {
  return (
    <Input
      onChange={(e) => onSearch(e.target.value)}
      value={searchQuery}
      type="text"
      placeholder="Search movies..."
      className="border-gray-400 bg-gray-300 h-full dark:border-[#444444] py-2 px-4"
    />
  );
}
