import { Link } from "react-router-dom";
import Dropdown from "./ui/Dropdown";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartProvider";

export default function CartDropdown() {
  const { cart, loading, error } = useCart();

  return (
    <Dropdown>
      {({ isOpen, close, open, toggle }) => (
        <div onMouseLeave={close} onMouseEnter={open}>
          <Link
            to={"/checkout"}
            onMouseEnter={open}
            onMouseLeave={close}
            className="icon block"
            onClick={close}
          >
            <ShoppingCart />
          </Link>
          {isOpen && (
            <div onMouseLeave={close} className="menu-dropdown right-0">
              <ul>
                {cart.map(item => (
                  <li key={item.id}>
                    {item.name} {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Dropdown>
  );
}
