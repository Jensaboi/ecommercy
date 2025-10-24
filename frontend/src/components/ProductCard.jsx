import { Link } from "react-router-dom";
import { IMG_BASE_URL } from "../lib/constants";
export default function ProductCard({
  id,
  name,
  attributes,
  images,
  price,
  stock,
  subCategoryId,
  description,
}) {
  return (
    <Link to={`/products/${id}`} key={id}>
      <article>
        <div className="size-50">
          <img
            className="object-cover object-center w-full h-full"
            src={IMG_BASE_URL + images[0]}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <h3>{name}</h3>
          <p>{price}</p>
        </div>
      </article>
    </Link>
  );
}
