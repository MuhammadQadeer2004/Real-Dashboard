// Nakli (simulated) live data: har tick par pichli value se thoda sa random chalta hai
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const jitter = (amount) => (Math.random() - 0.5) * amount;

// Har value apne "normal" level ki taraf wapas khichti hai. Iske baghair value
// random chalte chalte aakhir me upar ki hadd par chipak jati hai.
const pull = (value, normal, strength) => value + (normal - value) * strength;

export const START = { rps: 820, users: 340, latency: 110, errors: 1.1 };

export function nextPoint(last) {
  const spike = Math.random() < 0.04; // kabhi kabhi latency achanak barh jati hai
  return {
    rps: clamp(pull(last.rps, 820, 0.06) + jitter(140), 200, 1700),
    users: clamp(Math.round(pull(last.users, 340, 0.05) + jitter(30)), 60, 900),
    latency: clamp(pull(last.latency, 110, 0.12) + jitter(16) + (spike ? 110 : 0), 40, 420),
    errors: clamp(pull(last.errors, 1.1, 0.1) + jitter(0.45) + (spike ? 1.2 : 0), 0.1, 6),
    spike,
  };
}

export function seedSeries(n = 40) {
  const out = [];
  let p = START;
  for (let i = 0; i < n; i++) {
    p = nextPoint(p);
    out.push({ ...p, spike: false });
  }
  return out;
}

const NORMAL = [
  ["ok", "Deployment finished"],
  ["info", "New user signed up"],
  ["ok", "Payment processed"],
  ["info", "Cache refreshed"],
  ["info", "Background job completed"],
];

export function makeEvent(point, id) {
  let type, text;
  if (point.spike) { type = "warn"; text = "Latency spike detected"; }
  else if (point.errors > 3) { type = "warn"; text = "Error rate above 3%"; }
  else { [type, text] = NORMAL[Math.floor(Math.random() * NORMAL.length)]; }
  return { id, type, text, time: new Date().toLocaleTimeString("en-GB") };
}