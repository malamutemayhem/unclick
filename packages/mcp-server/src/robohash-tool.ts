import { stampMeta } from "./connector-meta.js";

export async function robohashUrl(args: Record<string, unknown>) {
  const text = String(args.text ?? "robot").trim();
  const size = Number(args.size) || 300;
  const set = String(args.set ?? "set1");
  const bg = String(args.bg ?? "").trim();
  let url = `https://robohash.org/${encodeURIComponent(text)}?size=${size}x${size}&set=${set}`;
  if (bg) url += `&bgset=${bg}`;
  return stampMeta(
    { url, text, size, set },
    { source: "robohash.org", fetched_at: new Date().toISOString(), next_steps: ["Sets: set1 (robots), set2 (monsters), set3 (heads), set4 (cats), set5 (humans). Bgs: bg1, bg2."] },
  );
}
