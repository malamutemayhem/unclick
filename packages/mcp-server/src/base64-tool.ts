import { stampMeta } from "./connector-meta.js";

export async function base64Encode(args: Record<string, unknown>) {
  const text = String(args.text ?? "");
  if (!text) return { error: "text is required" };
  const encoded = Buffer.from(text, "utf8").toString("base64");
  return stampMeta({ encoded, input_length: text.length, output_length: encoded.length }, {
    source: "local Buffer.from base64",
    fetched_at: new Date().toISOString(),
    next_steps: ["use base64_decode to reverse", "safe for embedding in URLs or JSON"],
  });
}

export async function base64Decode(args: Record<string, unknown>) {
  const encoded = String(args.encoded ?? "").trim();
  if (!encoded) return { error: "encoded (base64 string) is required" };
  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    return stampMeta({ decoded, input_length: encoded.length, output_length: decoded.length }, {
      source: "local Buffer.from base64 decode",
      fetched_at: new Date().toISOString(),
      next_steps: ["check decoded text for expected content", "use base64_encode to re-encode"],
    });
  } catch {
    return { error: "Invalid base64 input" };
  }
}
