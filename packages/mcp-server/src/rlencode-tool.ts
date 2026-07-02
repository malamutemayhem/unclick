import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function rlEncode(args: Record<string, unknown>) {
  const text = args.text;
  if (typeof text !== "string") {
    throw new Error("text is required and must be a string.");
  }
  if (text.length > 100000) {
    throw new Error("text must be 100000 characters or fewer.");
  }

  const decode = args.decode === true;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: [
      "RLE works best on data with many consecutive repeated characters",
      "Combine with other compression for better ratios on mixed data",
    ],
  };

  if (decode) {
    // Decode RLE: format is count followed by character, e.g. "3a2b1c"
    const decoded = decodeRle(text);
    return stampMeta(
      { encoded: text, decoded, length: decoded.length },
      meta,
    );
  }

  // Encode
  if (text.length === 0) {
    return stampMeta(
      { text, encoded: "", compression_ratio: 1, run_count: 0 },
      meta,
    );
  }

  let encoded = "";
  let runCount = 0;
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    let count = 1;
    while (i + count < text.length && text[i + count] === ch) {
      count++;
    }
    encoded += String(count) + ch;
    runCount++;
    i += count;
  }

  const compressionRatio =
    Math.round((encoded.length / text.length) * 1e6) / 1e6;

  return stampMeta(
    { text, encoded, compression_ratio: compressionRatio, run_count: runCount },
    meta,
  );
}

function decodeRle(encoded: string): string {
  let result = "";
  let i = 0;
  while (i < encoded.length) {
    // Read the number
    let numStr = "";
    while (i < encoded.length && encoded[i] >= "0" && encoded[i] <= "9") {
      numStr += encoded[i];
      i++;
    }
    if (numStr === "" || i >= encoded.length) {
      throw new Error(
        "Invalid RLE format. Expected pattern: <count><char> (e.g. '3a2b').",
      );
    }
    const count = Number(numStr);
    const ch = encoded[i];
    i++;
    result += ch.repeat(count);
  }
  return result;
}
