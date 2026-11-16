/** Decorative border and sprig share the portrait's 144-unit coordinate system. */
export function PortraitFlourish() {
  return (
    <svg
      className="portrait-flourish"
      viewBox="-96 0 240 144"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="72"
        cy="72"
        r="71.5"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.8"
      />
      <g
        stroke="currentColor"
        strokeWidth="0.65"
        strokeLinecap="round"
        opacity="0.65"
      >
        <path d="M5 98C-4 78-18 64-39 61C-58 58-71 56-82 49" />
        <path d="M-48 59C-58 50-61 44-63 38" />
        <path d="M-15 74C-24 62-28 55-28 48" />
        <path d="M-11 78C-18 74-26 75-32 79" />
        <path d="M5 98C-14 75-36 69-57 73C-64 74-71 80-68 84C-64 89-58 84-63 80C-66 76-71 76-73 74" />
      </g>
      <g className="portrait-leaf portrait-leaf-one">
        <path
          d="M-62 42C-74 38-70 29-72 23C-61 29-57 34-62 42Z"
          fill="currentColor"
          opacity="0.88"
        />
        <path
          d="M-63 40Q-66 32-70 27"
          stroke="currentColor"
          strokeWidth="0.55"
          opacity="0.65"
        />
      </g>
      <g className="portrait-leaf portrait-leaf-two">
        <path
          d="M-27 57C-38 52-37 41-34 34C-33 40-23 41-27 57Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M-28 54Q-32 45-33 38"
          stroke="currentColor"
          strokeWidth="0.55"
          opacity="0.6"
        />
      </g>
      <g className="portrait-leaf portrait-leaf-three">
        <path
          d="M-40 61C-47 74-57 74-65 74C-61 63-54 60-40 61Z"
          fill="currentColor"
          opacity="0.88"
        />
        <path
          d="M-43 63Q-51 68-61 72"
          stroke="currentColor"
          strokeWidth="0.55"
          opacity="0.6"
        />
      </g>
      <g className="portrait-leaf portrait-leaf-four">
        <path
          d="M-32 79C-32 90-40 94-44 101C-45 89-42 83-32 79Z"
          fill="currentColor"
          opacity="0.9"
        />
        <path
          d="M-33 82Q-39 90-42 97"
          stroke="currentColor"
          strokeWidth="0.55"
          opacity="0.6"
        />
      </g>
      <g transform="translate(-84 48)">
        <g className="portrait-blossom" fill="currentColor">
          <ellipse cy="-4.2" rx="2.2" ry="2.8" />
          <ellipse cy="-4.2" rx="2.2" ry="2.8" transform="rotate(72)" />
          <ellipse cy="-4.2" rx="2.2" ry="2.8" transform="rotate(144)" />
          <ellipse cy="-4.2" rx="2.2" ry="2.8" transform="rotate(216)" />
          <ellipse cy="-4.2" rx="2.2" ry="2.8" transform="rotate(288)" />
          <circle r="1.3" fill="var(--panel)" />
        </g>
      </g>
    </svg>
  );
}
