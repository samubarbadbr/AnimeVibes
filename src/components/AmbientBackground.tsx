/**
 * Fixed ambient gradient background — Apple-inspired dark mode with subtle drifting orbs.
 */
export default function AmbientBackground() {
  const accent = 'rgb(var(--accent-rgb))';
  const accent2 = 'rgb(var(--accent-2-rgb))';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[#0b0b0e]" />
      <div
        className="absolute -top-[15%] -left-[8%] h-[60vh] w-[60vh] rounded-full opacity-25 blur-[140px] animate-gradient-drift"
        style={{ background: `radial-gradient(circle, ${accent} 0%, transparent 70%)` }}
      />
      <div
        className="absolute top-[40%] -right-[12%] h-[55vh] w-[55vh] rounded-full opacity-20 blur-[150px] animate-gradient-drift-2"
        style={{ background: `radial-gradient(circle, ${accent2} 0%, transparent 70%)` }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.5) 100%)',
        }}
      />
    </div>
  );
}
