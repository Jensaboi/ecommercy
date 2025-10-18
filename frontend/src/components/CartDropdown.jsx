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
          <div className="relative">
            {cart.length > 0 && (
              <span className="absolute -top-1 right-0 inline-flex justify-center items-center text-bg-100 bg-dark-200 rounded-full font-medium text-[11px] w-4 h-4 ">
                {cart.length}
              </span>
            )}
            <Link
              to={"/checkout"}
              onMouseEnter={open}
              onMouseLeave={close}
              className="icon block"
              onClick={close}
            >
              <ShoppingCart />
            </Link>
          </div>
          {isOpen && (
            <div onMouseLeave={close} className="menu-dropdown right-0">
              <ul>
                {cart.map(item => (
                  <li key={item.id ?? item.product_id}>
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
