import Button from "./ui/Button";
import Modal from "./ui/Modal";
import useToggle from "../hooks/useToggle";
import { X, Menu } from "lucide-react";
import { Link } from "react-router-dom";

export default function MobileNav({ categories }) {
  const { isOpen, toggle, close } = useToggle();
  console.log(categories);
  console.log(isOpen);
  return (
    <div className="sm:hidden flex items-center gap-2 px-2">
      <Button
        onClick={toggle}
        className="border-1 p-1 hover:bg-shadow relative z-99"
      >
        {isOpen ? <X /> : <Menu />}
      </Button>
      <Modal isOpen={isOpen} className={"sm:hidden"}>
        <div className="bg-white w-full h-full">
          <nav>
            <ul className="flex flex-col">
              {Object.keys(categories).map(categoryName => (
                <Link>
                  <li>{categoryName}</li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      </Modal>
    </div>
  );
}
