import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function vigenereEncrypt(text: string, key: string): string {
  const k = key.toLowerCase().replace(/[^a-z]/g, "");
  if (!k) return text;
  let result = "";
  let ki = 0;
  for (const ch of text) {
    if (/[a-zA-Z]/.test(ch)) {
      const base = ch >= "a" ? 97 : 65;
      const shift = k.charCodeAt(ki % k.length) - 97;
      result += String.fromCharCode(((ch.charCodeAt(0) - base + shift) % 26) + base);
      ki++;
    } else {
      result += ch;
    }
  }
  return result;
}

function vigenereDecrypt(text: string, key: string): string {
  const k = key.toLowerCase().replace(/[^a-z]/g, "");
  if (!k) return text;
  let result = "";
  let ki = 0;
  for (const ch of text) {
    if (/[a-zA-Z]/.test(ch)) {
      const base = ch >= "a" ? 97 : 65;
      const shift = k.charCodeAt(ki % k.length) - 97;
      result += String.fromCharCode(((ch.charCodeAt(0) - base - shift + 26) % 26) + base);
      ki++;
    } else {
      result += ch;
    }
  }
  return result;
}

export async function vigenereProcess(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text : "";
  if (!text) return { error: "text is required" };
  const key = typeof args.key === "string" ? args.key : "";
  if (!key || !/[a-zA-Z]/.test(key)) return { error: "key is required (letters only)" };

  const decrypt = args.decrypt === true;
  const output = decrypt ? vigenereDecrypt(text, key) : vigenereEncrypt(text, key);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: decrypt
      ? ["Encrypt with decrypt: false"]
      : ["Decrypt with decrypt: true and the same key"],
  };
  return stampMeta({
    input: text,
    output,
    key: key.toLowerCase().replace(/[^a-z]/g, ""),
    direction: decrypt ? "decrypt" : "encrypt",
  }, meta);
}
