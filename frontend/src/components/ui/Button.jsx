import { icons } from "lucide-react";

export default function Button({
  children,
  className = "",
  onClick,
  variant,
  ...rest
}) {
  const variants = {
    primary: "",
    secondary: "",
    icon: "hover:cursor-pointer p-2 hover:bg-shadow rounded-md",
  };

  return (
    <button
      className={`hover:cursor-pointer ${
        variant && variants[variant]
      } ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
