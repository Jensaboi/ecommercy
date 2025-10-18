import { Search } from "lucide-react";

export default function Searchbar({ onChange, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-full h-10 bg-bg-100 border-1-shadow border rounded-full"
    >
      <Search
        color="gray"
        className="absolute top-[24%] left-3 z-2 text-zinc-800"
        size={20}
      />
      <input
        value={value}
        onChange={onChange}
        className="rounded-full pl-11 h-full w-full"
        placeholder="Looking for something?"
        type="text"
      />
    </div>
  );
}
