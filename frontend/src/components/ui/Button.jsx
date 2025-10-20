export default function Button({
  children,
  className = "",
  onClick,
  variant,
  loading = false,
  loadingText = "loading...",
  ...rest
}) {
  const variants = {
    primary: "primary-btn",
    secondary: "",
    icon: "icon",
  };

  return (
    <button
      disabled={loading}
      className={`hover:cursor-pointer ${
        variant && variants[variant]
      } ${className}`}
      onClick={onClick}
      {...rest}
    >
      {loading ? loadingText : children}
    </button>
  );
}
