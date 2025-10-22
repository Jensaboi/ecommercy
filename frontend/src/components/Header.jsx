import { Link } from "react-router-dom";
import { Search, Heart } from "lucide-react";
import { useRouteLoaderData } from "react-router-dom";
import DesktopProductsNav from "./DesktopProductsNav";
import MobileNav from "./MobileNav";
import Logo from "./Logo";
import UserMenuDropdown from "./UserMenuDropdown";
import CartDropdown from "./CartDropdown";

import useToggle from "../hooks/useToggle";
import Button from "./ui/Button";
import MenuIcon from "./MenuIcon";
import SearchDropdown from "./SearchDropdown";

export default function Header() {
  const { categories } = useRouteLoaderData("root");
  const nav = useToggle();

  return (
    <header className="bg-bg-100 relative px-4 py-2 flex flex-col shadow-lg shadow-shadow">
      <div className="flex justify-between items-center">
        <div className="relative z-99 flex justify-center items-center gap-2">
          <Button className="lg:hidden" onClick={nav.toggle} variant={"icon"}>
            <MenuIcon isOpen={nav.isOpen} />
          </Button>

          <Logo onClick={nav.close} />
        </div>

        <MobileNav
          categories={categories}
          close={nav.close}
          open={nav.open}
          toggle={nav.toggle}
          isOpen={nav.isOpen}
        />

        <div className="flex items-center gap-1">
          <UserMenuDropdown />

          <Link to={"/wishlist"} className="icon">
            <Heart />
          </Link>

          <CartDropdown />
        </div>
      </div>
      <div className="block lg:flex justify-between py-2 w-full">
        <DesktopProductsNav categories={categories} />

        <SearchDropdown />
      </div>
    </header>
  );
}
