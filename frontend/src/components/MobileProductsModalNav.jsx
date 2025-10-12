import Searchbar from "./Searchbar";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import useToggle from "../hooks/useToggle";
import { X, Menu } from "lucide-react";

export default function MobileProductsModalNav() {
  const { isOpen, toggle, close } = useToggle();

  return (
    <div className="sm:hidden flex items-center gap-2">
      <Button onClick={toggle} variant="icon">
        <Menu color="white" />
      </Button>
      <Modal className={"bg-white"} isOpen={isOpen}>
        <div className="w-full h-full">
          <header>
            <Button onClick={close}>
              <X />
            </Button>
          </header>
        </div>
      </Modal>

      <Searchbar />
    </div>
  );
}
