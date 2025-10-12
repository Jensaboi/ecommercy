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
    icon: "inline-flex justify-center items-center p-3 rounded-full hover:bg-zinc-700",
  };

  return (
    <button
      className={`hover:cursor-pointer ${variant && variants[variant]} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
