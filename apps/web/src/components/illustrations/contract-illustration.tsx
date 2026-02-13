export function ContractIllustration() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 540 360"
      role="img"
      aria-label="Manifesto do casal"
      className="max-h-80"
    >
      <defs>
        <linearGradient id="contractBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent-soft)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="540" height="360" rx="32" fill="url(#contractBg)" />
      <rect x="90" y="40" width="190" height="280" rx="20" fill="var(--surface-muted)" stroke="var(--stroke)" />
      <rect x="260" y="64" width="190" height="256" rx="20" fill="var(--surface)" stroke="var(--stroke)" />
      <path d="M130 96h110M130 126h110M130 156h90M130 186h110" stroke="var(--text-muted)" strokeWidth="5" strokeLinecap="round" />
      <path d="M300 124h110M300 154h110M300 184h90M300 214h110M300 244h110" stroke="var(--text-muted)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="170" cy="268" r="20" fill="var(--accent-soft)" stroke="var(--accent)" />
      <circle cx="372" cy="284" r="20" fill="var(--accent-soft)" stroke="var(--accent)" />
      <path d="M170 258v20M160 268h20M372 274v20M362 284h20" stroke="var(--accent)" strokeWidth="2.5" />
      <path d="M170 268h202" stroke="var(--accent)" strokeWidth="1.8" strokeDasharray="8 8" />
    </svg>
  );
}
