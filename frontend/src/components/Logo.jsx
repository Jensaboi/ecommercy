import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <span className="text-3xl tracking-wide font-logo font-bold">
        Ecommercy
      </span>
    </Link>
  );
}
