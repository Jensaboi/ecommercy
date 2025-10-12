import useToggle from "../hooks/useToggle";
import { Link } from "react-router-dom";

export default function MobileNavListItem({
  category,
  subCategories,
  closeNav,
}) {
  const { isOpen, toggle, close, open } = useToggle();

  return (
    <li className="w-full" onMouseLeave={close} onMouseEnter={open}>
      <Link
        onClick={() => {
          close();
          closeNav();
        }}
        to={`/products/category/${category}`}
      >
        <span className="block p-5 border w-full hover:underline hover:underline-offset-4">
          {category}
        </span>
      </Link>
      <ul className={`${isOpen ? "flex" : "hidden"} flex-col w-full`}>
        {subCategories.map((subCategory, i) => (
          <Link
            onClick={() => {
              close();
              closeNav();
            }}
            key={i}
            to={`/products/category/${category}?subCategory=${subCategory}`}
          >
            <li className="w-full p-4 hover:underline hover:underline-offset-4 hover:bg-shadow">
              {subCategory}
            </li>
          </Link>
        ))}
      </ul>
    </li>
  );
}
