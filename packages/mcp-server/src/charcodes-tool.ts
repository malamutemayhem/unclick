import { stampMeta, ConnectorMeta } from "./connector-meta.js";

export async function charcodesConvert(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text : "";
  if (!text) return { error: "text is required" };

  const format = args.format === "hex" ? "hex" : args.format === "binary" ? "binary" : "decimal";

  const characters = [...text].map((ch) => {
    const cp = ch.codePointAt(0)!;
    let display: string;
    if (format === "hex") display = "U+" + cp.toString(16).toUpperCase().padStart(4, "0");
    else if (format === "binary") display = cp.toString(2);
    else display = String(cp);
    return { char: ch, code_point: cp, display };
  });

  const codes = characters.map((c) => c.display);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Try format: hex for Unicode notation", "Try format: binary for binary representation"],
  };
  return stampMeta({
    input: text,
    format,
    character_count: characters.length,
    codes,
    characters,
  }, meta);
}
