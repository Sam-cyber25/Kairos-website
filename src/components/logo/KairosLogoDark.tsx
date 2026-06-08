interface LogoProps {
  className?: string;
  size?: number;
}

export default function KairosLogoDark({ className = '', size = 120 }: LogoProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.25}
      viewBox="0 0 120 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Kairos logo"
      role="img"
    >
      {/* Wreath left branch */}
      <g stroke="#F8F0E5" strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M60 105 C50 95, 38 80, 30 62" />
        <ellipse cx="48" cy="98" rx="6" ry="3.5" transform="rotate(-35 48 98)" fill="#F8F0E5" opacity="0.9" />
        <ellipse cx="40" cy="88" rx="6" ry="3.5" transform="rotate(-50 40 88)" fill="#F8F0E5" opacity="0.9" />
        <ellipse cx="35" cy="77" rx="6" ry="3.5" transform="rotate(-65 35 77)" fill="#F8F0E5" opacity="0.85" />
        <ellipse cx="31" cy="67" rx="5.5" ry="3" transform="rotate(-75 31 67)" fill="#F8F0E5" opacity="0.8" />
        <ellipse cx="30" cy="56" rx="5" ry="2.8" transform="rotate(-85 30 56)" fill="#F8F0E5" opacity="0.75" />
      </g>
      {/* Wreath right branch */}
      <g stroke="#F8F0E5" strokeWidth="1.8" fill="none" strokeLinecap="round">
        <path d="M60 105 C70 95, 82 80, 90 62" />
        <ellipse cx="72" cy="98" rx="6" ry="3.5" transform="rotate(35 72 98)" fill="#F8F0E5" opacity="0.9" />
        <ellipse cx="80" cy="88" rx="6" ry="3.5" transform="rotate(50 80 88)" fill="#F8F0E5" opacity="0.9" />
        <ellipse cx="85" cy="77" rx="6" ry="3.5" transform="rotate(65 85 77)" fill="#F8F0E5" opacity="0.85" />
        <ellipse cx="89" cy="67" rx="5.5" ry="3" transform="rotate(75 89 67)" fill="#F8F0E5" opacity="0.8" />
        <ellipse cx="90" cy="56" rx="5" ry="2.8" transform="rotate(85 90 56)" fill="#F8F0E5" opacity="0.75" />
      </g>
      {/* Lightning bolt */}
      <path
        d="M65 20 L50 58 L62 58 L55 88 L74 50 L62 50 L70 20 Z"
        fill="#F8F0E5"
        stroke="#F8F0E5"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* KAIROS wordmark */}
      <text
        x="60"
        y="122"
        textAnchor="middle"
        fontFamily="'Playfair Display', serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing="2.5"
        fill="#F8F0E5"
      >
        KAIROS
      </text>
      {/* Tagline */}
      <text
        x="60"
        y="136"
        textAnchor="middle"
        fontFamily="'Montserrat', sans-serif"
        fontSize="6"
        fontWeight="400"
        letterSpacing="2"
        fill="#F8F0E5"
        opacity="0.7"
      >
        THE PURSUIT CONTINUES
      </text>
    </svg>
  );
}
