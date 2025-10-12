import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import Dropdown from "./ui/Dropdown";
import { useState } from "react";
import { useDebounce } from "../hooks/useDebounce.js";

export default function Searchbar({ className = "", ...rest }) {
  const [query, setQuery] = useState("");

  const { result, loading, error } = useDebounce(query, 1000);

  function handleClick(close) {
    close();
    setQuery("");
  }

  return (
    <Dropdown className={`${className} w-full`} {...rest}>
      {({ isOpen, toggle, open, close }) => (
        <>
          <div onClick={open} className="relative w-full">
            <Search
              color="gray"
              className="absolute top-[9px] left-3 z-2 text-zinc-800"
              size={20}
            />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="bg-white p-2 pl-11 rounded-sm w-full"
              placeholder="search..."
              type="text"
            />
          </div>
          {isOpen && query ? (
            <ul className="bg-white absolute top-full left-0 z-10 w-full">
              {result.map(item => (
                <Link
                  onClick={handleClick}
                  key={item.id}
                  to={`/products/${item.id}`}
                >
                  <li>{item.name}</li>
                </Link>
              ))}
            </ul>
          ) : null}
        </>
      )}
    </Dropdown>
  );
}
