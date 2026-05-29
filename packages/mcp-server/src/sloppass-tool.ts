/**
 * sloppass-tool - MCP handler for deterministic SlopPass runs.
 *
 * The tool sends caller-provided file text or unified diff text to
 * /api/sloppass. SlopPass does not execute code, read repos, persist source
 * content, or make paid model calls by default.
 */

function getApiBase(): string {
  return (process.env.UNCLICK_API_URL ?? "https://unclick.world").replace(/\/$/, "");
}

function getApiKey(): string {
  const key = process.env.UNCLICK_API_KEY?.trim();
  if (!key) {
    throw new Error("UNCLICK_API_KEY env var is not set. Get your install config at https://unclick.world");
  }
  return key;
}

async function callApi(body: Record<string, unknown>): Promise<unknown> {
  const response = await fetch(`${getApiBase()}/api/sloppass?action=run`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  let parsed: unknown = text;
  try {
    parsed = text ? JSON.parse(text) : null;
  } catch {
    // Keep raw text.
  }
  if (!response.ok) return { error: `sloppass API failed (HTTP ${response.status})`, body: parsed };
  return parsed;
}

function hasSource(args: Record<string, unknown>): boolean {
  const files = Array.isArray(args.files)
    ? args.files.filter(
        (file): file is { content: string } =>
          typeof file === "object" &&
          file !== null &&
          "content" in file &&
          typeof file.content === "string" &&
          file.content.trim().length > 0,
      )
    : [];
  return (
    files.length > 0 ||
    (typeof args.diff === "string" && args.diff.trim().length > 0)
  );
}

function hasValidChecks(args: Record<string, unknown>): boolean {
  return !("checks" in args) || !Array.isArray(args.checks) || args.checks.length > 0;
}

export async function sloppassRun(args: Record<string, unknown>): Promise<unknown> {
  if (!args.target || typeof args.target !== "object") {
    return { error: "target is required" };
  }
  if (!hasValidChecks(args)) {
    return { error: "checks must contain at least one SlopPass category when provided" };
  }
  if (!hasSource(args)) {
    return { error: "files or diff is required" };
  }
  try {
    return await callApi(args);
  } catch (error) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}
