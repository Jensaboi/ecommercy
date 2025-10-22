import { Minus, Plus, Trash2 } from "lucide-react";
import Button from "./ui/Button.jsx";
import { useCart } from "../context/CartProvider.jsx";
import { useCallback, useState } from "react";

export default function CartListItem({
  productId,
  imgPath,
  name,
  quantity,
  price,
  brand,
  color,
  ...rest
}) {
  const { deleteItemFromCart, updateCartItem } = useCart();

  const [loadingId, setLoadingId] = useState(null);

  async function handleDelete(productId) {
    setLoadingId(productId);

    try {
      await deleteItemFromCart(productId);
    } finally {
      setLoadingId(null);
    }
  }
  return (
    <article className="flex items-start relative gap-2" {...rest}>
      <Button
        onClick={() => handleDelete(productId)}
        className="absolute top-0 right-0"
        variant={"icon"}
        loading={loadingId === productId}
        loadingText="..."
      >
        <Trash2 />
      </Button>
      <div className="aspect-square max-h-28 h-full max-w-18 bg-red-500 w-full">
        {/* <img
          loading="lazy"
          className="object-cover object-center w-full h-full"
          src={`http://localhost:8000/public` + imgPath}
          alt={name}
        /> */}
      </div>

      <div className="">
        <h3>{name}</h3>
        <p>{price}</p>
        <p>Brand: {brand}</p>
        <p>Color: {color}</p>
        <div className="w-full flex items-center gap-2">
          <p>Quantity: {quantity}</p>
          <Button
            onClick={() => updateCartItem({ productId, changeAmount: -1 })}
            variant={"icon"}
          >
            <Minus size={16} />
          </Button>

          <Button
            onClick={() => updateCartItem({ productId, changeAmount: 1 })}
            variant={"icon"}
          >
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </article>
  );
}
