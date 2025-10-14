import { Link } from "react-router-dom";
import Dropdown from "./ui/Dropdown";
import { ShoppingCart } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { fetchAllCartItems } from "../lib/api";

export default function CartDropdown() {
  const { data, loading, error } = useFetch(fetchAllCartItems);
  console.log(data);
  return (
    <Dropdown>
      {({ isOpen, close, open, toggle }) => (
        <div onMouseLeave={close} onMouseEnter={open}>
          <Link
            to={"/checkout"}
            onMouseEnter={open}
            onMouseLeave={close}
            className="icon hidden xs:block"
          >
            <ShoppingCart />
          </Link>
          {isOpen && (
            <div onMouseLeave={close} className="menu-dropdown right-0">
              <ul>
                {data.map(item => (
                  <li>{item.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Dropdown>
  );
}
