import { stampMeta } from "./connector-meta.js";

const UA = "UnClick-MCP/1.0";
const TIMEOUT_MS = 10_000;

export async function colormindGeneratePalette(args: Record<string, unknown>) {
  const model = String(args.model ?? "default");
  const input = args.input as Array<unknown> | undefined;
  const body: Record<string, unknown> = { model };
  if (Array.isArray(input) && input.length === 5) {
    body.input = input;
  }

  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch("http://colormind.io/api/", {
      method: "POST",
      headers: { "User-Agent": UA, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ac.signal,
    });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    const data = (await res.json()) as Record<string, unknown>;
    const result = data.result as number[][] | undefined;
    const hexColors = result?.map(
      (rgb: number[]) => "#" + rgb.map((c) => c.toString(16).padStart(2, "0")).join(""),
    );
    return stampMeta(
      { palette_rgb: result, palette_hex: hexColors },
      { source: "colormind.io", fetched_at: new Date().toISOString(), next_steps: ["Use colormind_list_models to see available models."] },
    );
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}

export async function colormindListModels(_args: Record<string, unknown>) {
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), TIMEOUT_MS);
  try {
    const res = await fetch("http://colormind.io/list/", {
      method: "GET",
      headers: { "User-Agent": UA },
      signal: ac.signal,
    });
    clearTimeout(timer);
    if (res.status === 429) return { error: "Rate limit exceeded. Try again in a minute." };
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    const data = (await res.json()) as Record<string, unknown>;
    return stampMeta(data, { source: "colormind.io", fetched_at: new Date().toISOString(), next_steps: ["Use colormind_generate_palette with a model name."] });
  } catch (e: unknown) {
    clearTimeout(timer);
    if (e instanceof Error && e.name === "AbortError") return { error: "Request timed out." };
    return { error: String(e) };
  }
}
