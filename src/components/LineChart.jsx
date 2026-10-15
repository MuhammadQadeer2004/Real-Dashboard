// Chart khud SVG se banaya gaya hai (koi chart library nahi)
export default function LineChart({ data, domain = [0, 1800], unit = "" }) {
  const W = 640, H = 250;
  const pad = { l: 52, r: 14, t: 14, b: 26 };
  const [lo, hi] = domain;
  const x = (i) => pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r);
  const y = (v) => pad.t + (1 - (v - lo) / (hi - lo)) * (H - pad.t - pad.b);

  const line = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const area = `${line} L${x(data.length - 1).toFixed(1)} ${H - pad.b} L${x(0).toFixed(1)} ${H - pad.b} Z`;
  const ticks = [0, 1, 2, 3].map((k) => lo + ((hi - lo) * k) / 3);
  const last = data[data.length - 1];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Line chart, latest value ${Math.round(last)} ${unit}`} className="w-full">
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
        </linearGradient>
      </defs>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} stroke="#232C4A" strokeDasharray="4 6" />
          <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#64748B" fontFamily="IBM Plex Mono, monospace">{Math.round(t)}</text>
        </g>
      ))}
      <path d={area} fill="url(#areaFill)" />
      <path d={line} fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(data.length - 1)} cy={y(last)} r="5" fill="#38BDF8" />
      <circle cx={x(data.length - 1)} cy={y(last)} r="10" fill="#38BDF8" opacity="0.25" />
    </svg>
  );
}
