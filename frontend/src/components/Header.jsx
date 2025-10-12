import { Link } from "react-router-dom";
import { User, Heart, Search, ShoppingCart, Menu } from "lucide-react";
import HeaderListItem from "./HeaderListItem";
import { useRouteLoaderData } from "react-router-dom";
import DesktopProductsNav from "./DesktopProductsNav";
import Searchbar from "./Searchbar";
import MobileNav from "./MobileNav";
import Button from "./ui/Button";
import Logo from "./Logo";
import Modal from "./ui/Modal";

export default function Header() {
  const { categories } = useRouteLoaderData("root");

  return (
    <header className="bg-bg-100 px-4 py-5 flex items-center justify-between shadow-lg shadow-shadow">
      <Logo />

      <div className="flex items-center gap-2">
        <Button variant={"icon"}>
          <Search />
        </Button>
        <Button variant={"icon"}>
          <ShoppingCart />
        </Button>
        <MobileNav categories={categories} />
      </div>
    </header>
  );
}
