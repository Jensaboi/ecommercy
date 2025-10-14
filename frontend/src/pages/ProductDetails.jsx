import { useActionData, useLoaderData, useNavigation } from "react-router-dom";
import { addToCart, fetchProduct } from "../lib/api";
import { Form } from "react-router-dom";
import Button from "../components/ui/Button";

export async function loader({ params }) {
  const { id } = params;

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

export async function action({ params }) {
  console.log(params);
  const { id } = params;
  try {
    const result = await addToCart(id);

    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export default function ProductDetails() {
  const { product } = useLoaderData();
  const { attributes } = product;

  const result = useActionData();
  console.log(result);
  const navigation = useNavigation();
  console.log(navigation.state);
  //console.log(attributes);
  return (
    <div className="flex flex-col md:flex-row gap-8 h-full w-full">
      <div className="w-full h-140 md:h-auto md:flex-1 flex-shrink-0 overflow-hidden">
        <img
          className="w-full h-full object-cover object-center"
          src={"http://localhost:8000/public" + product.images[0]}
          alt={product.name}
        />
      </div>

      <div className="flex flex-col p-2 justify-start md:w-1/2 gap-4">
        <p className="text-sm font-semibold text-gray-500 uppercase">
          {attributes.brand}
        </p>

        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

        <div className="flex items-center gap-6">
          <p className="text-2xl font-semibold text-gray-900">
            {product.price} £
          </p>
          <Form method="POST">
            <Button
              disabled={
                navigation.state === "submitting" ||
                navigation.state === "loading"
              }
              variant="primary"
              className="flex-1 max-w-60 disabled:bg-red-500"
            >
              Add to cart
            </Button>
          </Form>
        </div>

        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <div className="flex flex-col gap-2 mt-4">
          <p className="text-sm font-semibold text-gray-500 uppercase">
            Product Details
          </p>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Brand:</span>
              <span className="text-gray-800">{attributes.brand}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Color:</span>
              <span className="text-gray-800">{attributes.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Material:</span>
              <span className="text-gray-800">{attributes.material}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Type:</span>
              <span className="text-gray-800">{attributes.type}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
