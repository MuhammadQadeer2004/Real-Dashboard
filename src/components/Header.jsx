export default function Header({ paused, onToggle, intervalMs, onSpeed }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Pulse</h1>
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold ${paused ? "bg-line text-slate-300" : "bg-emerald-400/15 text-emerald-300"}`}>
          <span className={`h-2 w-2 rounded-full ${paused ? "bg-slate-400" : "bg-emerald-400 animate-pulseDot"}`} />
          {paused ? "Paused" : "Live"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="speed" className="sr-only">Update speed</label>
        <select id="speed" value={intervalMs} onChange={(e) => onSpeed(Number(e.target.value))}
          className="rounded-full border border-line bg-panel px-4 py-2 text-sm font-semibold">
          <option value={2000}>Slow (2s)</option>
          <option value={1000}>Normal (1s)</option>
          <option value={500}>Fast (0.5s)</option>
        </select>
        <button type="button" onClick={onToggle}
          className="rounded-full bg-sky2 px-5 py-2 text-sm font-bold text-night transition hover:bg-white">
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
    </header>
  );
}
