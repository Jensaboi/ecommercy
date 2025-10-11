import { Link } from "react-router-dom";
import { User, Heart, ShoppingCart } from "lucide-react";
import HeaderListItem from "./HeaderListItem";
import { useRouteLoaderData } from "react-router-dom";
import DesktopProductsNav from "./DesktopProductsNav";
export default function Header() {
  const { categories } = useRouteLoaderData("root");

  return (
    <header className="bg-zinc-800">
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <Link to={"/"}>
          <h1 className="tracking-tight leading-tight text-2xl font-bold text-white pb-1 sm:p-0">
            Ecommercy
          </h1>
        </Link>
        <nav className="">
          <ul className="text-white flex items-center gap-2">
            <HeaderListItem to={"/login"} text={"Login"} icon={<User />} />
            <HeaderListItem
              to={"/dashboard"}
              text={"Wishlist"}
              icon={<Heart />}
            />
            <HeaderListItem
              to={"/checkout"}
              text={"Checkout"}
              icon={<ShoppingCart />}
            />
          </ul>
        </nav>
      </div>
      <DesktopProductsNav categories={categories} />
    </header>
  );
}
