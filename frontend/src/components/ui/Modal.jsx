import { createPortal } from "react-dom";
export default function Modal({ isOpen, className, children, ...rest }) {
  return isOpen
    ? createPortal(
        <div
          className={`z-10 w-full h-full fixed inset-0 ${className ?? ""}`}
          {...rest}
        >
          {children}
        </div>,
        document.body
      )
    : null;
}
