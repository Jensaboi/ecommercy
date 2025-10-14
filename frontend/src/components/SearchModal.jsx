import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce.js";
import Dropdown from "./ui/Dropdown.jsx";
import Searchbar from "./Searchbar.jsx";
import Modal from "./ui/Modal";
import Button from "./ui/Button";
import useToggle from "../hooks/useToggle";
import { X, Search } from "lucide-react";

export default function SearchModal() {
  const { isOpen, toggle, open, close } = useToggle();
  const [query, setQuery] = useState("");
  const { result, loading, error } = useDebounce(query, 1000);

  const handleOnChange = useCallback(e => {
    setQuery(e.target.value);
  }, []);

  function handleCloseModal() {
    close();
    setQuery("");
  }

  return (
    <>
      <Button onClick={toggle} variant={"icon"}>
        <Search />
      </Button>
      <Modal isOpen={isOpen}>
        <Dropdown className="w-full">
          {({ isOpen, toggle, open, close }) => (
            <>
              <div className="bg-bg-100 flex items-center justify-center h-18 p-2">
                <div className="w-full h-full max-w-160 flex items-center justify-center">
                  <Searchbar
                    onClick={open}
                    value={query}
                    onChange={handleOnChange}
                  />
                  <Button onClick={handleCloseModal} variant={"icon"}>
                    <X />
                  </Button>
                </div>
              </div>
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
      </Modal>
    </>
  );
}
