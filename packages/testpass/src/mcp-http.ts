export const MCP_ACCEPT_HEADER = "application/json, text/event-stream";

export function shouldSendVercelBypass(targetUrl?: string): boolean {
  if (!targetUrl) return false;
  try {
    const hostname = new URL(targetUrl).hostname.toLowerCase();
    return hostname === "vercel.app" || hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

export function buildMcpHeaders(targetUrl?: string): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: MCP_ACCEPT_HEADER,
  };
  if (process.env.TESTPASS_TOKEN) {
    headers.Authorization = `Bearer ${process.env.TESTPASS_TOKEN}`;
  }
  const vercelBypass =
    process.env.TESTPASS_TARGET_VERCEL_BYPASS_SECRET?.trim()
    || process.env.VERCEL_AUTOMATION_BYPASS_SECRET?.trim();
  if (vercelBypass && shouldSendVercelBypass(targetUrl)) {
    headers["x-vercel-protection-bypass"] = vercelBypass;
  }
  return headers;
}

export async function readMcpResponseBody(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.toLowerCase().includes("text/event-stream")) {
    return parseSseJson(text);
  }

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function parseSseJson(text: string): unknown {
  const events = text.split(/\r?\n\r?\n/);
  for (const event of events) {
    const data = event
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"))
      .map((line) => line.slice("data:".length).trimStart())
      .join("\n")
      .trim();

    if (!data || data === "[DONE]") continue;

    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }

  return text;
}
