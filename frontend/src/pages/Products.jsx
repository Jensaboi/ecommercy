import { useLoaderData } from "react-router-dom";
import { fetchAllProducts } from "../lib/api";
import ProductsFilter from "../components/ProductsFilter";
import ProductCard from "../components/ProductCard";

export async function loader({ params, request }) {
  try {
    const url = new URL(request.url);
    const { category } = params;
    let queryStr = url.search;

    if (category) {
      if (queryStr) {
        queryStr += `&category=${category}`;
      } else {
        queryStr = "?category=" + category;
      }
    }

    let products = await fetchAllProducts(queryStr);

    products = products.map(item => ({
      ...item,
      attributes: JSON.parse(item.attributes),
      images: JSON.parse(item.images),
    }));

    return { products };
  } catch (err) {}
}

export default function Products() {
  const { products } = useLoaderData();
  //console.log(products);

  return (
    <div>
      <h2 className="text-2xl font-medium">Products</h2>
      <ProductsFilter />
      <ul className="flex flex-wrap items-center gap-6">
        {products.map(
          ({
            id,
            name,
            attributes,
            images,
            price,
            stock,
            sub_category_id,
            description,
          }) => (
            <ProductCard
              key={id}
              id={id}
              name={name}
              attributes={attributes}
              images={images}
              price={price}
              stock={stock}
              subCategoryId={sub_category_id}
              description={description}
            />
          )
        )}
      </ul>
    </div>
  );
}
