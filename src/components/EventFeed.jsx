const DOT = { ok: "bg-emerald-400", info: "bg-sky2", warn: "bg-amber2" };

export default function EventFeed({ events }) {
  if (events.length === 0) return <p className="text-slate-400">Waiting for events…</p>;
  return (
    <ul className="space-y-3" aria-live="polite">
      {events.map((e) => (
        <li key={e.id} className="flex items-start gap-3">
          <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${DOT[e.type]}`} aria-hidden="true" />
          <p className="flex-1 leading-snug">{e.text}</p>
          <time className="font-mono text-sm text-slate-500">{e.time}</time>
        </li>
      ))}
    </ul>
  );
}
