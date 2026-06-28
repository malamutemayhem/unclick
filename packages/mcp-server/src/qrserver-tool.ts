import { stampMeta } from "./connector-meta.js";

export async function qrserverGenerate(args: Record<string, unknown>) {
  const data = String(args.data || "");
  if (!data) return { error: "data (text or URL to encode) is required." };
  const size = String(args.size || "200x200");
  const format = String(args.format || "png");
  const params = [
    `data=${encodeURIComponent(data)}`,
    `size=${encodeURIComponent(size)}`,
    `format=${encodeURIComponent(format)}`,
  ];
  if (args.color) params.push(`color=${encodeURIComponent(String(args.color))}`);
  if (args.bgcolor) params.push(`bgcolor=${encodeURIComponent(String(args.bgcolor))}`);
  const url = `https://api.qrserver.com/v1/create-qr-code/?${params.join("&")}`;
  return stampMeta(
    { url, data, size, format },
    { source: "api.qrserver.com", fetched_at: new Date().toISOString(), next_steps: ["Use the url directly in an <img> tag or download link.", "Customize with size (WxH), format (png/svg/jpg), color, and bgcolor (hex without #)."] },
  );
}
