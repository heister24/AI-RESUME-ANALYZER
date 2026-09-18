import { useId } from "react";

/**
 * Modern vector Logo component for ResumeLens
 *
 * @param {Object} props
 * @param {'full'|'icon'|'stacked'|'wordmark'} [props.variant='full'] - Layout variant
 * @param {'xs'|'sm'|'md'|'lg'|'xl'|'2xl'} [props.size='md'] - Sizing scale
 * @param {'light'|'dark'|'auto'} [props.theme='light'] - Theme for typography
 * @param {boolean} [props.showBadge=true] - Whether to render the 'AI' pill badge
 * @param {string} [props.badgeText='AI'] - Text inside the pill badge
 * @param {boolean} [props.animated=true] - Whether to apply interactive micro-animations
 * @param {string} [props.className=''] - Additional container classes
 */
const Logo = ({
  variant = "full",
  size = "md",
  theme = "light",
  showBadge = true,
  badgeText = "AI",
  animated = true,
  className = "",
}) => {
  const uid = useId().replace(/:/g, "");

  // Size dimensions for the icon emblem
  const sizeMap = {
    xs: {
      icon: 26,
      text: "text-base",
      badge: "text-[9px] px-1.5 py-0.5",
      gap: "gap-2",
    },
    sm: {
      icon: 32,
      text: "text-lg",
      badge: "text-[10px] px-1.5 py-0.5",
      gap: "gap-2.5",
    },
    md: {
      icon: 40,
      text: "text-xl",
      badge: "text-[11px] px-2 py-0.5",
      gap: "gap-3",
    },
    lg: {
      icon: 48,
      text: "text-2xl",
      badge: "text-xs px-2.5 py-0.5",
      gap: "gap-3.5",
    },
    xl: {
      icon: 60,
      text: "text-3xl",
      badge: "text-xs px-3 py-1",
      gap: "gap-4",
    },
    "2xl": {
      icon: 76,
      text: "text-4xl",
      badge: "text-sm px-3.5 py-1",
      gap: "gap-4",
    },
  };

  const config = sizeMap[size] || sizeMap.md;
  const iconPx = config.icon;

  const textColorClass =
    theme === "dark"
      ? "text-white"
      : theme === "auto"
        ? "text-current"
        : "text-gray-900";

  // The high-detail SVG Emblem
  const IconMark = (
    <div
      className={`relative flex items-center justify-center shrink-0 ${
        animated
          ? "transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-1"
          : ""
      }`}
      style={{ width: iconPx, height: iconPx }}
    >
      <svg
        viewBox="0 0 48 48"
        width={iconPx}
        height={iconPx}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
        aria-hidden="true"
      >
        <defs>
          {/* Background Squircle Gradient */}
          <linearGradient
            id={`rl-bg-${uid}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#047857" />
            <stop offset="55%" stopColor="#065f46" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Neon Lens & Handle Gradient */}
          <linearGradient
            id={`rl-neon-${uid}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="60%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Inner Lens Radial Glow */}
          <radialGradient id={`rl-glow-${uid}`} cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#34D399" stopOpacity="0.38" />
            <stop offset="65%" stopColor="#06B6D4" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </radialGradient>

          {/* Squircle Glass Border */}
          <linearGradient
            id={`rl-border-${uid}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Squircle Base */}
        <rect
          x="2"
          y="2"
          width="44"
          height="44"
          rx="12.5"
          fill={`url(#rl-bg-${uid})`}
        />
        <rect
          x="2.5"
          y="2.5"
          width="43"
          height="43"
          rx="12"
          stroke={`url(#rl-border-${uid})`}
          strokeWidth="1"
        />

        {/* Background Resume Document Silhouette */}
        <path
          d="M12 12C12 10.8954 12.8954 10 14 10H25L32 17V34C32 35.1046 31.1046 36 30 36H14C12.8954 36 12 35.1046 12 34V12Z"
          fill="#082b21"
          stroke="#10B981"
          strokeWidth="1.2"
          strokeOpacity="0.5"
        />

        {/* Document Folded Corner */}
        <path
          d="M25 10V16C25 16.5523 25.4477 17 26 17H32"
          stroke="#10B981"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.65"
        />

        {/* Document Experience & Skills Lines */}
        <line
          x1="16"
          y1="18"
          x2="21"
          y2="18"
          stroke="#34D399"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
        <line
          x1="16"
          y1="22"
          x2="22"
          y2="22"
          stroke="#6EE7B7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.55"
        />
        <line
          x1="16"
          y1="26"
          x2="19"
          y2="26"
          stroke="#6EE7B7"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.55"
        />

        {/* Magnifying Optical Lens Glass */}
        <circle cx="27" cy="25" r="9" fill={`url(#rl-glow-${uid})`} />

        {/* Lens Glass Reflection Highlight Arc */}
        <path
          d="M22 21C23.3 19.5 25.2 18.5 27.2 18.5"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />

        {/* Optical Lens Rim */}
        <circle
          cx="27"
          cy="25"
          r="9"
          stroke={`url(#rl-neon-${uid})`}
          strokeWidth="2.2"
        />

        {/* Lens Scanner Handle */}
        <path
          d="M33.5 31.5L38.5 36.5"
          stroke={`url(#rl-neon-${uid})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Focused Target Reticle inside Lens */}
        <circle cx="27" cy="25" r="1.8" fill="#38BDF8" />
        <circle
          cx="27"
          cy="25"
          r="4.5"
          stroke="#34D399"
          strokeWidth="0.8"
          strokeDasharray="2 1.5"
          strokeOpacity="0.85"
        />

        {/* AI Sparkle Star (4-point brilliance) */}
        <path
          d="M36 10C36 12 37.5 13.5 39.5 13.5C37.5 13.5 36 15 36 17C36 15 34.5 13.5 32.5 13.5C34.5 13.5 36 12 36 10Z"
          fill="#34D399"
          className={animated ? "animate-pulse" : ""}
        />
        <circle cx="36" cy="13.5" r="0.8" fill="#ffffff" />
      </svg>
    </div>
  );

  // Typography Wordmark
  const Wordmark = (
    <div className="flex items-center gap-2">
      <span
        className={`font-extrabold tracking-tight select-none ${config.text} ${textColorClass}`}
      >
        Resume
        <span className="bg-linear-to-r from-emerald-500 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
          Lens
        </span>
      </span>

      {showBadge && (
        <span
          className={`inline-flex items-center font-bold uppercase tracking-wider rounded-full bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-xs select-none ${config.badge}`}
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

  // Default 'full' variant (horizontal row)
  return (
    <div className={`inline-flex items-center ${config.gap} ${className}`}>
      {IconMark}
      {Wordmark}
    </div>
  );
};

export default Logo;
