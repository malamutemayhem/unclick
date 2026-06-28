import { stampMeta } from "./connector-meta.js";

export async function countryFlagUrl(args: Record<string, unknown>) {
  const code = String(args.country_code ?? "").trim().toUpperCase();
  if (!code || code.length !== 2) return { error: "country_code is required (2-letter ISO code, e.g. US, GB, AU)." };
  const style = String(args.style ?? "flat").toLowerCase();
  const size = Number(args.size) || 64;
  const flat = `https://flagcdn.com/${size === 16 ? 16 : size <= 32 ? 24 : size <= 48 ? 48 : 64}x${size === 16 ? 12 : size <= 32 ? 18 : size <= 48 ? 36 : 48}/${code.toLowerCase()}.png`;
  const svg = `https://flagcdn.com/${code.toLowerCase()}.svg`;
  const url = style === "svg" ? svg : flat;
  return stampMeta(
    { url, country_code: code, style },
    { source: "flagcdn.com", fetched_at: new Date().toISOString(), next_steps: ["Use style=svg for scalable vector flags."] },
  );
}
