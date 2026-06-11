import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function railfenceEncrypt(text: string, rails: number): string {
  if (rails <= 1 || rails >= text.length) return text;
  const fence: string[][] = Array.from({ length: rails }, () => []);
  let rail = 0;
  let dir = 1;
  for (const ch of text) {
    fence[rail].push(ch);
    if (rail === 0) dir = 1;
    else if (rail === rails - 1) dir = -1;
    rail += dir;
  }
  return fence.flat().join("");
}

function railfenceDecrypt(text: string, rails: number): string {
  if (rails <= 1 || rails >= text.length) return text;
  const n = text.length;
  const pattern: number[] = [];
  let rail = 0;
  let dir = 1;
  for (let i = 0; i < n; i++) {
    pattern.push(rail);
    if (rail === 0) dir = 1;
    else if (rail === rails - 1) dir = -1;
    rail += dir;
  }
  const sorted = pattern.map((r, i) => ({ r, i })).sort((a, b) => a.r - b.r || a.i - b.i);
  const result = Array(n).fill("");
  for (let i = 0; i < n; i++) {
    result[sorted[i].i] = text[i];
  }
  return result.join("");
}

export async function railfenceProcess(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text : "";
  if (!text) return { error: "text is required" };
  const rails = typeof args.rails === "number" && args.rails >= 2 ? Math.floor(args.rails) : 3;
  const decrypt = args.decrypt === true;

  const output = decrypt ? railfenceDecrypt(text, rails) : railfenceEncrypt(text, rails);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: decrypt
      ? ["Encrypt with decrypt: false"]
      : ["Decrypt with decrypt: true and the same number of rails"],
  };
  return stampMeta({ input: text, output, rails, direction: decrypt ? "decrypt" : "encrypt" }, meta);
}
