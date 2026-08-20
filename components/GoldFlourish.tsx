export function GoldFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 18"
      className={`gold-flourish mx-auto h-4 w-32 ${className}`}
      fill="none"
      aria-hidden
    >
      <path
        d="M6 9 C 28 2, 42 16, 70 9 S 108 2, 134 9"
        stroke="var(--gold)"
        strokeWidth="1.15"
        strokeLinecap="round"
      />
      <circle className="gold-flourish-dot" cx="70" cy="9" r="2.1" fill="var(--gold)" />
    </svg>
  );
}
