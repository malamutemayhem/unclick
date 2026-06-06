import { runGeoPass } from "./geopass-runtime.js";

type GeoPassRunRecord = Awaited<ReturnType<typeof runGeoPass>>;

const RUNS = new Map<string, Exclude<GeoPassRunRecord, { error: string }>>();

function isGeoPassRun(value: GeoPassRunRecord): value is Exclude<GeoPassRunRecord, { error: string }> {
  return typeof value === "object" && value !== null && !("error" in value);
}

function parseChecks(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

export async function geopassRun(args: Record<string, unknown>): Promise<unknown> {
  const url =
    (typeof args.url === "string" && args.url.trim()) ||
    (typeof args.target_url === "string" && args.target_url.trim()) ||
    "";
  if (!url) return { error: "url or target_url is required" };

  const run = await runGeoPass({
    url,
    checks: parseChecks(args.checks),
    targetSha: typeof args.target_sha === "string" && args.target_sha.trim() ? args.target_sha.trim() : undefined,
  });
  if (!isGeoPassRun(run)) return run;
  RUNS.set(run.run_id, run);
  return run;
}

export async function geopassStatus(args: Record<string, unknown>): Promise<unknown> {
  const runId = typeof args.run_id === "string" ? args.run_id.trim() : "";
  if (!runId) return { error: "run_id is required" };
  const run = RUNS.get(runId);
  if (!run) return { error: `GEOPass run '${runId}' was not found in this MCP session` };
  return run;
}
