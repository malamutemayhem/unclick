import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function encode(text: string): string {
  if (!text) return "";
  let result = "";
  let count = 1;
  for (let i = 1; i <= text.length; i++) {
    if (i < text.length && text[i] === text[i - 1]) {
      count++;
    } else {
      result += count > 1 ? `${count}${text[i - 1]}` : text[i - 1];
      count = 1;
    }
  }
  return result;
}

function decode(text: string): string {
  let result = "";
  let num = "";
  for (const ch of text) {
    if (ch >= "0" && ch <= "9") {
      num += ch;
    } else {
      const repeat = num ? parseInt(num, 10) : 1;
      result += ch.repeat(repeat);
      num = "";
    }
  }
  return result;
}

export async function runlengthProcess(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text : "";
  if (!text) return { error: "text is required" };

  const isDecode = args.decode === true;

  const output = isDecode ? decode(text) : encode(text);
  const ratio = isDecode ? null : text.length > 0 ? +(output.length / text.length).toFixed(3) : null;

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: isDecode
      ? ["Encode text by omitting the decode flag"]
      : ["Decode back with decode: true"],
  };
  return stampMeta({
    input: text,
    output,
    direction: isDecode ? "decode" : "encode",
    ...(ratio !== null ? { compression_ratio: ratio } : {}),
  }, meta);
}
