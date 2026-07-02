import { stampMeta } from "./connector-meta.js";

export async function httpDogImage(args: Record<string, unknown>) {
  const code = Number(args.status_code);
  if (isNaN(code) || code < 100 || code > 599) return { error: "status_code is required (100-599)." };
  const url = `https://http.dog/${code}.jpg`;
  return stampMeta(
    { image_url: url, status_code: code },
    { source: "http.dog", fetched_at: new Date().toISOString(), next_steps: ["Returns a dog image URL for the given HTTP status code.", "Similar to httpcat but with dogs instead of cats."] },
  );
}
