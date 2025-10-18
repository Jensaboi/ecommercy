import { User, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import MobileNavListItem from "./MobileNavListItem";

export default function MobileNav({ categories, close, open, toggle, isOpen }) {
  return (
    <nav
      data-open={isOpen}
      className="fixed p-5 lg:hidden flex flex-col justify-between pb-6 bg-bg-100 data-[open=true]:shadow-2xl fixed inset-0 z-10
      data-[open=true]:translate-x-0
      data-[open=false]:-translate-x-full
      transition-transform ease-in-out duration-300 w-[80%] xs:w-[70%] sm:w-[60%] md:w-[50%] h-full pt-24"
    >
      <ul className="flex flex-col w-full gap-1 h-full">
        {Object.keys(categories).map((category, i) => (
          <MobileNavListItem
            key={i}
            closeNav={close}
            category={category}
            subCategories={categories[category]}
          />
        ))}
      </ul>
      <div className="flex flex-col gap-2 self-end w-full">
        <Link onClick={close} to={"/login"} className="primary-btn">
          Sign in
        </Link>

        <Link onClick={close} to={"/register"} className="text-dark-300">
          Dont have an account?
          <span className="text-blue-500 ml-2">Register one here!</span>
        </Link>
      </div>
    </nav>
  );
}
