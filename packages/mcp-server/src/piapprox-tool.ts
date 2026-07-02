import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function piApprox(args: Record<string, unknown>) {
  const terms = typeof args.terms === "number" ? Math.floor(args.terms) : 1000;
  if (terms < 1 || terms > 1000000) return { error: "terms must be between 1 and 1,000,000" };

  let leibniz = 0;
  for (let i = 0; i < terms; i++) {
    leibniz += (i % 2 === 0 ? 1 : -1) / (2 * i + 1);
  }
  leibniz *= 4;

  let nilakantha = 3;
  for (let i = 1; i < terms; i++) {
    const d = 2 * i;
    nilakantha += (i % 2 === 1 ? 1 : -1) * 4 / (d * (d + 1) * (d + 2));
  }

  let wallis = 1;
  for (let i = 1; i <= terms; i++) {
    wallis *= (4 * i * i) / (4 * i * i - 1);
  }
  wallis *= 2;

  const actual = Math.PI;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Nilakantha converges faster than Leibniz", "More terms = better approximation"],
  };
  return stampMeta({
    terms,
    leibniz: +leibniz.toFixed(12),
    nilakantha: +nilakantha.toFixed(12),
    wallis: +wallis.toFixed(12),
    actual_pi: +actual.toFixed(12),
    leibniz_error: +Math.abs(leibniz - actual).toExponential(6),
    nilakantha_error: +Math.abs(nilakantha - actual).toExponential(6),
    wallis_error: +Math.abs(wallis - actual).toExponential(6),
  }, meta);
}
