import { useState } from "react";

export default function useToggle() {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(prev => !prev);
  }

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return { isOpen, toggle, close, open };
}
