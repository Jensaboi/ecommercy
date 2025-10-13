import { Link } from "react-router-dom";
import Dropdown from "./ui/Dropdown";
import { ShoppingCart } from "lucide-react";

export default function CartDropdown() {
  return (
    <Dropdown>
      {({ isOpen, close, open, toggle }) => (
        <div onMouseLeave={close} onMouseEnter={open}>
          <Link
            onMouseEnter={open}
            onMouseLeave={close}
            className="icon hidden xs:block"
          >
            <ShoppingCart />
          </Link>
          {isOpen && (
            <div onMouseLeave={close} className="menu-dropdown right-0">
              <ul>text</ul>
            </div>
          )}
        </div>
      )}
    </Dropdown>
  );
}
