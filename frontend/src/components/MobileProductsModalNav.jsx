import Searchbar from "./Searchbar";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import useToggle from "../hooks/useToggle";
import { X, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileProductsModalNav({ categories }) {
  const { isOpen, toggle, close } = useToggle();
  console.log(categories);
  return (
    <div className="sm:hidden flex items-center gap-2 px-2">
      <Button onClick={toggle} variant="icon">
        <Menu color="white" />
      </Button>
      <Modal className={"bg-white"} isOpen={isOpen}>
        <div className="w-full h-full">
          <header className="w-full p-5 flex items-center justify-end">
            <Button onClick={close}>
              <X />
            </Button>
          </header>
          <ul>
            {Object.keys(categories).map(categoryName => (
              <Link onClick={close} to={`/products/category/${categoryName}`}>
                <li>{categoryName}</li>
              </Link>
            ))}
          </ul>
        </div>
      </Modal>

      <Searchbar />
    </div>
  );
}
