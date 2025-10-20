import { Link } from "react-router-dom";

export default function Logo({ onClick }) {
  return (
    <Link onClick={onClick} to={"/"}>
      <span className="text-3xl tracking-wide font-logo font-bold">
        Ecommercy
      </span>
    </Link>
  );
}
