import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="p-6">
      <nav>
        <ul>
          <li>
            <Link to={"/products"}>Products</Link>
          </li>
          <li>
            <Link to={"/checkout"}>Checkout</Link>
          </li>
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}
