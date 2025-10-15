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
    primary:
      "px-8 py-3 bg-dark-200 text-bg-200 text-md font-semibold hover:bg-dark-300 active:bg-dark-100 inline-flex justify-center items-center gap-2 rounded-sm disabled:bg-gray-600",
    secondary: "",
    icon: "hover:cursor-pointer p-2 hover:bg-shadow rounded-md inline-flex justify-center items-center",
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
