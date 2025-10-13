import { Link } from "react-router-dom";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { useRouteLoaderData } from "react-router-dom";
import DesktopProductsNav from "./DesktopProductsNav";
import Searchbar from "./Searchbar";
import MobileNav from "./MobileNav";
import Button from "./ui/Button";
import Logo from "./Logo";
import UserMenuDropdown from "./UserMenuDropdown";
import CartDropdown from "./CartDropdown";

export default function Header() {
  const { categories } = useRouteLoaderData("root");

  return (
    <header className="bg-bg-100 px-4 py-5 flex items-center justify-between gap-6 shadow-lg shadow-shadow">
      <Logo />

      <DesktopProductsNav categories={categories} />

      <div className="flex items-center gap-2">
        <Button variant={"icon"}>
          <Search />
        </Button>
        <UserMenuDropdown />
        <Link to={"/wishlist"} className="hidden icon xs:block">
          <Heart />
        </Link>
        <CartDropdown />
        <MobileNav categories={categories} />
      </div>
    </header>
  );
}
