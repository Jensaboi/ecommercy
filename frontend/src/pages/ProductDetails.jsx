import { useLoaderData } from "react-router-dom";
import { fetchProduct } from "../lib/api";

export async function loader({ params }) {
  const { id } = params;
  console.log(id);
  try {
    let product = await fetchProduct(id);
    product = {
      ...product,
      attributes: JSON.parse(product.attributes),
      images: JSON.parse(product.images),
    };
    return { product };
  } catch (err) {
    console.log(err);
  }
}

export default function ProductDetails() {
  const { product } = useLoaderData();
  console.log(product);
  return (
    <div>
      <h1 className="text-2xl font-medium">{product.name}</h1>
      <div className="max-w-120">
        <img
          className="object-cover object-center w-full h-full"
          src={"http://localhost:8000/public" + product.images[0]}
        />
      </div>
      <p>{product.price}</p>
      <p>{product.description}</p>
    </div>
  );
}
