import Button from "./ui/Button";
import useToggle from "../hooks/useToggle";
import { X, Menu, User, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import MobileNavListItem from "./MobileNavListItem";
import { useMemo } from "react";

export default function MobileNav({ categories }) {
  const { isOpen, toggle, close } = useToggle();

  const closeNav = useMemo(() => close, []);

  return (
    <div className="lg:hidden flex items-center gap-2 px-2">
      <Button
        onClick={toggle}
        className="border-1 p-1 hover:bg-shadow relative z-99"
      >
        {isOpen ? <X /> : <Menu />}
      </Button>

      <nav
        data-open={isOpen}
        className="fixed p-5 bg-bg-100 shadow-2xl top-0 bottom-0 right-0 data-[open=true]:translate-x-0 data-[open=false]:translate-x-full  transition-transform ease-in-out  w-[70%] h-full"
      >
        <div className="w-full pt-1 pb-10 flex items-center justify-start gap-xs">
          <Link className="icon xs:hidden block">
            <User />
          </Link>

          <Link className="icon xs:hidden block">
            <Heart />
          </Link>
        </div>
        <ul className="flex flex-col w-full gap-1">
          {Object.keys(categories).map((category, i) => (
            <MobileNavListItem
              key={i}
              closeNav={closeNav}
              category={category}
              subCategories={categories[category]}
            />
          ))}
          <li>
            <Link>Sign in</Link>
          </li>
          <li>
            <Link>Dont have an account? Sign up!</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
