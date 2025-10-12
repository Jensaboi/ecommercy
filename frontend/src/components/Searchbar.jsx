import { Search } from "lucide-react";
export default function Searchbar({ className = "", ...rest }) {
  return (
    <div className={`${className} w-full`} {...rest}>
      <div className="relative w-full">
        <Search
          color="gray"
          className="absolute top-[9px] left-3 z-2 text-zinc-800"
          size={20}
        />
        <input
          className="bg-white p-2 pl-11 rounded-sm w-full"
          placeholder="search..."
          type="text"
        />
      </div>
    </div>
  );
}
