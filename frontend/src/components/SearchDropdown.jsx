import { useState, useCallback } from "react";
import { useDebounce } from "../hooks/useDebounce";
import Dropdown from "./ui/Dropdown";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";

export default function SearchDropdown({ handleCloseModal }) {
  const [query, setQuery] = useState("");
  const { result, loading, error } = useDebounce(query, 1000);

  const handleOnChange = useCallback(e => {
    setQuery(e.target.value);
  }, []);
  return (
    <div>
      <Dropdown className="w-full">
        {({ isOpen, toggle, open, close }) => (
          <>
            <Searchbar onClick={open} value={query} onChange={handleOnChange} />
            {isOpen && query ? (
              <ul className="bg-white border-bg-shadow border rounded-sm absolute top-full left-0 right-0 z-10 w-full max-w-165 p-2 mx-auto">
                {result.map(item => (
                  <Link
                    onClick={() => {
                      close();
                      handleCloseModal();
                    }}
                    key={item.id}
                    to={`/products/${item.id}`}
                  >
                    <li className="hover:bg-shadow p-2">{item.name}</li>
                  </Link>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </Dropdown>
    </div>
  );
}
