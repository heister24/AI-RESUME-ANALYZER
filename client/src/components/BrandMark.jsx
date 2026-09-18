import { Link } from "react-router-dom";
import Logo from "./Logo";

const BrandMark = ({
  size = "md",
  variant = "full",
  theme = "light",
  showBadge = true,
  className = "",
  to = "/",
}) => (
  <Link
    to={to}
    className={`group inline-flex cursor-pointer items-center transition-opacity hover:opacity-95 ${className}`}
  >
    <Logo
      size={size}
      variant={variant}
      theme={theme}
      showBadge={showBadge}
    />
  </Link>
);

export default BrandMark;