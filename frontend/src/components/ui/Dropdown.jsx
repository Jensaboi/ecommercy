import useToggle from "../../hooks/useToggle";
import { useRef, useEffect } from "react";

export default function Dropdown({ children, className, ...rest }) {
  const ref = useRef(null);

  const { isOpen, toggle, close, open } = useToggle(false);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`${className ? className : ""} relative`}
      {...rest}
    >
      {children({ isOpen, toggle, open, close })}
    </div>
  );
}
