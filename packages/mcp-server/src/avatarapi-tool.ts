import { stampMeta } from "./connector-meta.js";

export async function avatarUrl(args: Record<string, unknown>) {
  const name = String(args.name ?? "User").trim();
  const size = Number(args.size) || 200;
  const bg = String(args.background ?? "random").replace(/^#/, "");
  const color = String(args.color ?? "fff").replace(/^#/, "");
  const format = String(args.format ?? "svg").toLowerCase();
  const url = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=${bg}&color=${color}&format=${format}`;
  return stampMeta(
    { url, name, size },
    { source: "ui-avatars.com", fetched_at: new Date().toISOString(), next_steps: ["Adjust name, size, background, color, and format."] },
  );
}
