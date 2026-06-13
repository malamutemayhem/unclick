import { stampMeta } from "./connector-meta.js";

export async function urlEncode(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  if (!text) return { error: "text is required" };
  const encoded = encodeURIComponent(text);
  return stampMeta({ encoded, input_length: text.length, output_length: encoded.length }, {
    source: "local encodeURIComponent",
    fetched_at: new Date().toISOString(),
    next_steps: ["use url_decode to reverse", "safe for embedding in query strings"],
  });
}

export async function urlDecode(args: Record<string, unknown>) {
  const encoded = String(args.encoded ?? "").trim();
  if (!encoded) return { error: "encoded (URL-encoded string) is required" };
  try {
    const decoded = decodeURIComponent(encoded);
    return stampMeta({ decoded, input_length: encoded.length, output_length: decoded.length }, {
      source: "local decodeURIComponent",
      fetched_at: new Date().toISOString(),
      next_steps: ["check decoded text for expected content", "use url_encode to re-encode"],
    });
  } catch {
    return { error: "Invalid URL-encoded input" };
  }
}
