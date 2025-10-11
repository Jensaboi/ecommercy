import { Link } from "react-router-dom";

export default function HeaderListItem({ to, text, icon, ...rest }) {
  return (
    <li {...rest}>
      <Link className="text-white" to={to}>
        <div className="inline-flex flex-col items-center justify-center gap-1">
          {icon}
          <span className="hidden sm:block text-xs tracking-wide">{text}</span>
        </div>
      </Link>
    </li>
  );
}
