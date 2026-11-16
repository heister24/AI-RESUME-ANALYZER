import { useId } from "react";

/**
 * Minimalist Brand Mark for ResumeLens
 * Foundations color palette (Shopify Editions Winter '24 aesthetic).
 */
const Logo = ({
  variant = "full",
  size = "md",
  theme = "dark",
  showBadge = true,
  badgeText = "ATS",
  animated = true,
  className = "",
}) => {
  const uid = useId().replace(/:/g, "");

  const sizeMap = {
    xs: {
      icon: 24,
      text: "text-base",
      badge: "text-[9px] px-1.5 py-0.5",
      gap: "gap-2",
    },
    sm: {
      icon: 28,
      text: "text-lg",
      badge: "text-[10px] px-1.5 py-0.5",
      gap: "gap-2.5",
    },
    md: {
      icon: 32,
      text: "text-xl",
      badge: "text-[10px] px-2 py-0.5",
      gap: "gap-2.5",
    },
    lg: {
      icon: 40,
      text: "text-2xl",
      badge: "text-xs px-2.5 py-0.5",
      gap: "gap-3",
    },
    xl: {
      icon: 48,
      text: "text-3xl",
      badge: "text-xs px-3 py-1",
      gap: "gap-3.5",
    },
    "2xl": {
      icon: 56,
      text: "text-4xl",
      badge: "text-sm px-3.5 py-1",
      gap: "gap-4",
    },
  };

  const config = sizeMap[size] || sizeMap.md;
  const iconPx = config.icon;

  // Clean geometric mark (Foundations Palette)
  const IconMark = (
    <div
      className={`relative flex items-center justify-center shrink-0 ${
        animated ? "transition-transform duration-200 group-hover:scale-105" : ""
      }`}
      style={{ width: iconPx, height: iconPx }}
    >
      <svg
        viewBox="0 0 32 32"
        width={iconPx}
        height={iconPx}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          width="32"
          height="32"
          rx="9"
          fill="#3D52A0"
        />
        <rect
          x="0.5"
          y="0.5"
          width="31"
          height="31"
          rx="8.5"
          stroke="#ADBBDA"
          strokeOpacity="0.5"
        />
        {/* Three precision waves in Foundations palette */}
        <path
          d="M8 11.5C10.5 9.5 13.5 9.5 16 11.5C18.5 13.5 21.5 13.5 24 11.5"
          stroke="#EDE8F5"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M8 16C10.5 14 13.5 14 16 16C18.5 18 21.5 18 24 16"
          stroke="#7091E6"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <path
          d="M8 20.5C10.5 18.5 13.5 18.5 16 20.5C18.5 22.5 21.5 22.5 24 20.5"
          stroke="#ADBBDA"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );

  // Typography Wordmark
  const Wordmark = (
    <div className="flex items-center gap-2">
      <span
        className={`font-semibold tracking-[-0.03em] select-none text-[#18203D] ${config.text}`}
      >
        Resume
        <span className="font-extrabold text-[#3D52A0]">Lens</span>
      </span>

      {showBadge && (
        <span
          className={`inline-flex items-center font-mono font-bold tracking-widest uppercase rounded-full bg-[#EDE8F5] border border-[#ADBBDA]/60 text-[#3D52A0] select-none ${config.badge}`}
        >
          {badgeText}
        </span>
      )}
    </div>
  );

  if (variant === "icon") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {IconMark}
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={`inline-flex items-center ${className}`}>{Wordmark}</div>
    );
  }

  if (variant === "stacked") {
    return (
      <div
        className={`inline-flex flex-col items-center text-center gap-2 ${className}`}
      >
        {IconMark}
        {Wordmark}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${config.gap} ${className}`}>
      {IconMark}
      {Wordmark}
    </div>
  );
};

export default Logo;