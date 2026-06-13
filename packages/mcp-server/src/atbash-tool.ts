import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function atbash(text: string): string {
  let result = "";
  for (const ch of text) {
    if (ch >= "a" && ch <= "z") {
      result += String.fromCharCode(219 - ch.charCodeAt(0));
    } else if (ch >= "A" && ch <= "Z") {
      result += String.fromCharCode(155 - ch.charCodeAt(0));
    } else {
      result += ch;
    }
  }
  return result;
}

export async function atbashProcess(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text : "";
  if (!text) return { error: "text is required" };

  const output = atbash(text);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Atbash is its own inverse - apply again to decode"],
  };
  return stampMeta({ input: text, output }, meta);
}
