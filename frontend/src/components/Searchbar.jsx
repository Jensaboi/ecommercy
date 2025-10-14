import { Search } from "lucide-react";

export default function Searchbar({ onChange, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative w-full h-full bg-bg-100 border-1-shadow border rounded-md flex"
    >
      <Search
        color="gray"
        className="absolute top-[28%] left-3 z-2 text-zinc-800"
        size={20}
      />
      <input
        value={value}
        onChange={onChange}
        className="bg-white p-2 pl-11 rounded-sm h-full w-full"
        placeholder="search..."
        type="text"
      />
    </div>
  );
}
