import Dropdown from "./ui/Dropdown.jsx";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

export default function UserMenuDropdown() {
  return (
    <Dropdown>
      {({ isOpen, open, toggle, close }) => (
        <div onMouseLeave={close} onMouseEnter={open}>
          <Link onClick={close} to={"/dashboard"} className="icon">
            <User />
          </Link>
          {isOpen && (
            <ul
              className="menu-dropdown flex flex-col gap-6 sm:-right-1 -right-8"
              onMouseLeave={close}
            >
              <li className="flex flex-col gap-2">
                <Link
                  to={"/login"}
                  onClick={close}
                  className="w-full primary-btn"
                >
                  Sign in
                </Link>

                <Link
                  to={"/register"}
                  onClick={close}
                  className="text-dark-300"
                >
                  No account?{" "}
                  <span className="text-blue-500 hover:underline hover:underline-offset-2">
                    Register here!
                  </span>
                </Link>
              </li>
              <li>
                <Link to={"/dashboard"} onClick={close} className="nav-text">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to={"/orders"} onClick={close} className="nav-text">
                  My Orders
                </Link>
              </li>
              <li>
                <Link to={"/wishlist"} onClick={close} className="nav-text">
                  Wishlist
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </Dropdown>
  );
}
