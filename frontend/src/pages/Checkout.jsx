import CartListItem from "../components/CartListItem.jsx";
import { useCart } from "../context/CartProvider.jsx";
import { Link } from "react-router-dom";
export async function loader() {
  try {
    return null;
  } catch (err) {}
}

export default function Checkout() {
  const { cart, loading, error } = useCart();

  const total =
    cart?.reduce((acc, curr) => acc + curr.price * curr.quantity, 0) ?? 0;
  const itemsInCart = cart?.length || 0;
  return (
    <section className="container mx-auto">
      <h2 className="text-2xl font-semibold mb-4 ml-2">
        Cart <span>( {cart?.length} item )</span>
      </h2>

      {itemsInCart > 0 ? (
        <div className="flex flex-col gap-10">
          <ul className="flex flex-col py-4 px-4 gap-6">
            {cart.map(item => (
              <CartListItem
                key={item?.id || item?.product_id}
                name={item.name}
                imgPath={item.images[0]}
                price={item.price}
                brand={item.attributes.brand}
                color={item.attributes.color}
                quantity={item.quantity}
                productId={item.product_id}
              />
            ))}
          </ul>
          <div className="bg-shadow px-4 py-10 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Total</h3>
              <p className="font-medium">{total}</p>
            </div>
            <Link to={"/checkout/info"} className="primary-btn">
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6 px-4 py-10 text-center">
          <p>You currently haven no items in your cart.</p>

          <Link onClick={close} to="/products" className="primary-btn">
            Checkout our products
          </Link>
        </div>
      )}
    </section>
  );
}
