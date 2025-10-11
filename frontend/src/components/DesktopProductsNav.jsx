import { Link } from "react-router-dom";
import { useState } from "react";

export default function DesktopProductsNav({ categories }) {
  const [category, setCategory] = useState(null);

  return (
    <div onMouseLeave={() => setCategory(null)} className="w-full relative">
      <nav>
        <ul className="flex items-center gap-4 px-6 pb-2 no-scrollbar">
          <Link to={"/products"}>
            <li
              className="relative text-white cursor-pointer px-2 py-2
             after:content-[''] after:absolute after:left-0 after:bottom-0
             after:h-[2px] after:w-0 after:bg-white
             after:transition-all after:duration-300
             hover:after:w-full"
              onMouseEnter={() => setCategory(null)}
            >
              All products
            </li>
          </Link>
          {Object.keys(categories).map((categoryName, i) => (
            <Link key={i} to={`/products/category/${categoryName}`}>
              <li
                onMouseEnter={() => setCategory(categoryName)}
                className={`relative text-white cursor-pointer px-2 py-2
                after:content-[''] after:absolute after:left-0 after:bottom-0
                after:h-[2px] after:bg-white after:transition-all after:duration-300
                ${
                  category === categoryName
                    ? "after:w-full"
                    : "after:w-0 hover:after:w-full"
                }`}
              >
                {categoryName}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      {category && (
        <ul className="flex absolute z-5 left-0 top-full bg-black items-center gap-6 p-4 w-full mx-auto">
          <Link to={`/products/category/${category}`}>
            <li className="text-white">All {category}</li>
          </Link>
          {categories[category].map((subCategory, i) => (
            <Link
              key={i}
              to={`/products/category/${category}?subCategory=${subCategory}`}
            >
              <li className="text-white underline-offset-4 decoration-2 hover:underline decoration-white">
                {subCategory}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
