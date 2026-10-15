import { useState } from "react";
import Header from "./components/Header";
import KpiCard from "./components/KpiCard";
import LineChart from "./components/LineChart";
import LatencyBars from "./components/LatencyBars";
import EventFeed from "./components/EventFeed";
import { useLiveStream } from "./hooks/useLiveStream";

const Panel = ({ title, children, className = "" }) => (
  <section className={`rounded-2xl border border-line bg-panel p-5 ${className}`}>
    <h2 className="mb-4 text-lg font-bold">{title}</h2>
    {children}
  </section>
);

export default function App() {
  const [paused, setPaused] = useState(false);
  const [intervalMs, setIntervalMs] = useState(1000);
  const { series, events } = useLiveStream({ paused, intervalMs });

  const last = series[series.length - 1];
  const col = (key) => series.map((p) => p[key]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-8">
      <Header paused={paused} onToggle={() => setPaused((p) => !p)} intervalMs={intervalMs} onSpeed={setIntervalMs} />
      <p className="mt-3 max-w-2xl text-slate-400">
        A simulated live data feed. New values arrive every tick, the numbers animate to them and the charts are drawn in plain SVG.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard label="Requests / sec" value={last.rps} history={col("rps")} />
        <KpiCard label="Active users" value={last.users} history={col("users")} />
        <KpiCard label="Avg latency" value={last.latency} history={col("latency")} suffix="ms" upIsGood={false} />
        <KpiCard label="Error rate" value={last.errors} history={col("errors")} decimals={2} suffix="%" upIsGood={false} warnAbove={3} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Requests per second" className="lg:col-span-2">
          <LineChart data={col("rps")} domain={[0, 1800]} unit="requests per second" />
        </Panel>
        <Panel title="Latency spread (last 60 ticks)">
          <LatencyBars values={col("latency")} />
        </Panel>
      </div>

      <Panel title="Recent events" className="mt-4">
        <EventFeed events={events} />
      </Panel>
    </div>
  );
}
