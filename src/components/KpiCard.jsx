import { useAnimatedNumber } from "../hooks/useAnimatedNumber";
import Sparkline from "./Sparkline";

export default function KpiCard({ label, value, history, decimals = 0, suffix = "", upIsGood = true, warnAbove }) {
  const shown = useAnimatedNumber(value);
  const past = history[Math.max(0, history.length - 11)];
  const change = past ? ((value - past) / past) * 100 : 0;
  const good = change === 0 ? true : upIsGood ? change > 0 : change < 0;
  const warn = warnAbove !== undefined && value > warnAbove;

  return (
    <div className={`rounded-2xl border bg-panel p-5 ${warn ? "border-amber2/70" : "border-line"}`}>
      <p className="text-sm font-semibold text-slate-400">{label}</p>
      <p className="mt-2 font-mono text-4xl font-semibold tabular-nums">
        {shown.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        <span className="ml-1 text-xl text-slate-400">{suffix}</span>
      </p>
      <p className={`mt-1 text-sm font-semibold ${good ? "text-emerald-400" : "text-amber2"}`}>
        {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(1)}%
        <span className="ml-1 font-normal text-slate-500">vs 10 ticks ago</span>
      </p>
      <div className="mt-3"><Sparkline data={history.slice(-30)} color={warn ? "#FBBF24" : "#38BDF8"} /></div>
    </div>
  );
}
