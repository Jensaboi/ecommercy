import { Link } from "react-router-dom";
import { useState } from "react";

export default function DesktopProductsNav({
  categories,
  className = "",
  ...rest
}) {
  const [category, setCategory] = useState(null);

  return (
    <div
      className={` relative items-center overflow-x-scroll scrollbar-hidden justify-between hidden lg:flex ${className}`}
      {...rest}
    >
      <nav>
        <ul className="flex items-center gap-4 no-scrollbar">
          <Link to={"/products"}>
            <li
              className="relative text-medium font-medium  cursor-pointer px-2 py-2
             after:content-[''] after:absolute after:left-0 after:bottom-0
             after:h-[2px] after:w-0 after:bg-dark-200
             after:transition-all after:duration-300
             hover:after:w-full"
              onMouseEnter={() => setCategory(null)}
            >
              Products
            </li>
          </Link>
          {Object.keys(categories).map((categoryName, i) => (
            <Link key={i} to={`/products/category/${categoryName}`}>
              <li
                onMouseEnter={() => setCategory(categoryName)}
                className={`relative cursor-pointer px-2 py-2 text-medium font-medium 
                after:content-[''] after:absolute after:left-0 after:bottom-0
                after:h-[2px] after:bg-dark-200 after:transition-all after:duration-300
                ${
                  category === categoryName
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`}
              >
                {categoryName.split("")[0].toUpperCase() +
                  categoryName.slice(1)}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      {category && (
        <ul
          onMouseLeave={() => setCategory(null)}
          className="flex fixed z-5 left-0 top-[82px] px-2 border-b-1 bg-bg-100 items-center w-full mx-auto"
        >
          {categories[category].map((subCategory, i) => (
            <Link
              key={i}
              to={`/products/category/${category}?subCategory=${subCategory}`}
            >
              <li className=" hover:bg-shadow py-5 px-10">
                {subCategory.split("")[0].toUpperCase() + subCategory.slice(1)}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
