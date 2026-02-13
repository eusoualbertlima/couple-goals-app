export function TreeSkinIllustration() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 420 320"
      role="img"
      aria-label="Skin de arvore premium"
      className="max-h-72"
    >
      <defs>
        <radialGradient id="halo" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="var(--accent-soft)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="420" height="320" rx="30" fill="url(#halo)" />
      <ellipse cx="210" cy="292" rx="116" ry="14" fill="color-mix(in srgb, var(--accent) 24%, transparent)" />
      <path
        d="M210 280V180C210 142 186 126 178 96c-6-22 10-44 32-46 22 2 38 24 32 46-8 30-32 46-32 84v100"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path d="M212 210c34-5 56-24 68-58" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round" />
      <path d="M208 196c-30-8-56-24-70-52" stroke="var(--accent)" strokeWidth="10" strokeLinecap="round" />
      <circle cx="284" cy="146" r="20" fill="var(--success)" opacity="0.85" />
      <circle cx="136" cy="142" r="18" fill="var(--success)" opacity="0.8" />
      <circle cx="228" cy="116" r="16" fill="var(--success)" opacity="0.7" />
      <circle cx="252" cy="84" r="10" fill="var(--warning)" />
      <circle cx="154" cy="110" r="10" fill="var(--warning)" />
    </svg>
  );
}
