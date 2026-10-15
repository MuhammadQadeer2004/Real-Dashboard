const BUCKETS = [
  { label: "< 80 ms", test: (v) => v < 80 },
  { label: "80 – 120", test: (v) => v >= 80 && v < 120 },
  { label: "120 – 160", test: (v) => v >= 120 && v < 160 },
  { label: "160 – 220", test: (v) => v >= 160 && v < 220 },
  { label: "220+ ms", test: (v) => v >= 220 },
];

export default function LatencyBars({ values }) {
  const counts = BUCKETS.map((b) => values.filter(b.test).length);
  const max = Math.max(...counts, 1);

  return (
    <ul className="space-y-3">
      {BUCKETS.map((b, i) => (
        <li key={b.label} className="flex items-center gap-3">
          <span className="w-20 shrink-0 font-mono text-sm text-slate-400">{b.label}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-line">
            <div className="h-full rounded-full bg-sky2 transition-all duration-500" style={{ width: `${(counts[i] / max) * 100}%` }} />
          </div>
          <span className="w-6 text-right font-mono text-sm tabular-nums">{counts[i]}</span>
        </li>
      ))}
    </ul>
  );
}
