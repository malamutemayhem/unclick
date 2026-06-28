import { stampMeta } from "./connector-meta.js";

export async function placebearImage(args: Record<string, unknown>) {
  const width = Math.min(Math.max(Number(args.width) || 300, 1), 2000);
  const height = Math.min(Math.max(Number(args.height) || 300, 1), 2000);
  const url = `https://placebear.com/${width}/${height}`;
  return stampMeta(
    { image_url: url, width, height },
    { source: "placebear.com", fetched_at: new Date().toISOString(), next_steps: ["Specify width and height in pixels (1-2000).", "Use the URL directly in image tags or markdown for bear placeholder images."] },
  );
}
