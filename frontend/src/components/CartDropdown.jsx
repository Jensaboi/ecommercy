import { Link } from "react-router-dom";
import Dropdown from "./ui/Dropdown";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartProvider";
import CartListItem from "./CartListItem";

export default function CartDropdown() {
  const { cart, loading, error } = useCart();
  const total = cart?.reduce((acc, curr) => acc + curr.price, 0) ?? 0;
  const itemsInCart = cart?.length || 0;

  return (
    <Dropdown>
      {({ isOpen, close, open, toggle }) => (
        <div onMouseLeave={close} onMouseEnter={open}>
          <div className="relative">
            {itemsInCart > 0 && (
              <span className="absolute -top-1 right-0 inline-flex justify-center items-center text-bg-100 bg-dark-200 rounded-full font-medium text-[11px] w-4 h-4 ">
                {cart.length}
              </span>
            )}
            <Link
              to={"/checkout"}
              onMouseEnter={open}
              className="icon"
              onClick={close}
            >
              <ShoppingCart />
            </Link>
          </div>
          {isOpen && (
            <div onMouseLeave={close} className="menu-dropdown right-0  w-108">
              <div className="py-4 w-full">
                <h3 className="text-center text-lg font-semibold">
                  Items in cart
                </h3>
              </div>

              <ul className="h-90 flex flex-col gap-3 overflow-hidden overflow-y-scroll">
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

              <div className=" flex flex-col gap-4 py-4">
                <div className="flex w-full justify-between items-center">
                  <span>Total price: </span>
                  <span>{total}</span>
                </div>
                <Link onClick={close} to={"/checkout"} className="primary-btn">
                  Go to checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </Dropdown>
  );
}
