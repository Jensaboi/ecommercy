import { X } from "lucide-react";
import Button from "./ui/Button.jsx";
export default function CartListItem({
  imgPath,
  name,
  quantity,
  price,
  brand,
  color,
  ...rest
}) {
  return (
    <article className="flex items-start relative gap-2" {...rest}>
      <Button className="absolute top-0 right-0" variant={"icon"}>
        <X />
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
        <p>Quantity: {quantity}</p>
      </div>
    </article>
  );
}
