import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const BASE = "https://newton.now.sh/api/v2";
const TIMEOUT_MS = 8_000;

async function fetchJson(url: string): Promise<unknown> {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, { headers: { "User-Agent": UA }, signal: ac.signal });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return await res.json();
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function newtonMath(args: Record<string, unknown>) {
  const operation = String(args.operation || "simplify");
  const expression = String(args.expression || "");
  if (!expression) return { error: "expression is required (e.g. '2^2+2(2)', 'x^2+2x')." };
  const ops = ["simplify", "factor", "derive", "integrate", "zeroes", "tangent", "area", "cos", "sin", "tan", "arccos", "arcsin", "arctan", "abs", "log"];
  if (!ops.includes(operation)) return { error: `operation must be one of: ${ops.join(", ")}.` };
  const data = await fetchJson(`${BASE}/${encodeURIComponent(operation)}/${encodeURIComponent(expression)}`);
  if (data && typeof data === "object" && "error" in data) return data;
  return stampMeta(data as Record<string, unknown>, { source: "newton.now.sh", fetched_at: new Date().toISOString(), next_steps: ["Operations: simplify, factor, derive, integrate, zeroes, tangent, area, cos, sin, tan, arccos, arcsin, arctan, abs, log.", "Use standard math notation: x^2 for power, 2x for multiplication."] });
}
