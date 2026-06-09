import { stampMeta } from "./connector-meta.js";

const BASE = "https://openiban.com/validate";
const TIMEOUT = 8_000;

export async function ibanValidate(args: Record<string, unknown>) {
  const iban = String(args.iban ?? "").trim().replace(/\s+/g, "");
  if (!iban) return { error: "iban is required" };
  const url = `${BASE}/${encodeURIComponent(iban)}?getBIC=true&validateBankCode=true`;
  const res = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) });
  if (!res.ok) throw new Error(`OpenIBAN ${res.status}`);
  const data = await res.json();
  return stampMeta(data, {
    source: `openiban.com/validate/${iban.slice(0, 4)}...`,
    fetched_at: new Date().toISOString(),
    next_steps: ["check valid field for validation result", "use bankData for BIC and bank name"],
  });
}
