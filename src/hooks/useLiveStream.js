import { useEffect, useRef, useState } from "react";
import { makeEvent, nextPoint, seedSeries } from "../utils/stream";

const MAX_POINTS = 60;

// Is hook ko baad me asli WebSocket se badla ja sakta hai: bas naye point yahan push karo
export function useLiveStream({ paused, intervalMs }) {
  const [series, setSeries] = useState(() => seedSeries(40));
  const [events, setEvents] = useState([]);
  const lastRef = useRef(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      const prev = lastRef.current || series[series.length - 1];
      const point = nextPoint(prev);
      lastRef.current = point;
      setSeries((s) => [...s.slice(-(MAX_POINTS - 1)), point]);
      if (point.spike || Math.random() < 0.35) {
        const ev = makeEvent(point, idRef.current++);
        setEvents((e) => [ev, ...e].slice(0, 8));
      }
    }, intervalMs);
    return () => clearInterval(timer);
    // series sirf pehli value ke liye chahiye
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, intervalMs]);

  return { series, events };
}
