import { getBackend } from "./memory/db.js";
import type { MemoryBackend } from "./memory/types.js";

type DefaultableBackend = Pick<MemoryBackend, "getBusinessContext" | "searchMemory">;

export interface ToolMemoryDefaultsResult {
  args: Record<string, unknown>;
  applied: string[];
}

interface PtvDefaults {
  stop_id?: string;
  route_type?: number;
  route_id?: string;
  direction_id?: string;
  max_results?: number;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function parseJsonish(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function normalizePtvDefaults(value: unknown): PtvDefaults | null {
  const raw = parseJsonish(value);
  const row = asRecord(raw);
  if (!row) return null;

  const stop = row.stop_id ?? row.stopId ?? row.home_stop_id ?? row.homeStopId;
  if (stop === undefined || stop === null || String(stop).trim() === "") return null;

  const defaults: PtvDefaults = { stop_id: String(stop).trim() };
  const routeType = Number(row.route_type ?? row.routeType ?? 0);
  if (Number.isFinite(routeType)) defaults.route_type = routeType;

  const routeId = row.route_id ?? row.routeId;
  if (routeId !== undefined && routeId !== null && String(routeId).trim()) defaults.route_id = String(routeId).trim();

  const directionId = row.direction_id ?? row.directionId;
  if (directionId !== undefined && directionId !== null && String(directionId).trim()) defaults.direction_id = String(directionId).trim();

  const maxResults = Number(row.max_results ?? row.maxResults);
  if (Number.isFinite(maxResults) && maxResults > 0) defaults.max_results = maxResults;

  return defaults;
}

function extractNumber(text: string, keys: string[]): number | undefined {
  for (const key of keys) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = text.match(new RegExp(`${escaped}\\s*(?:=|:|is)?\\s*(\\d+)`, "i"));
    if (match?.[1]) return Number(match[1]);
  }
  return undefined;
}

function extractString(text: string, keys: string[]): string | undefined {
  for (const key of keys) {
    const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = text.match(new RegExp(`${escaped}\\s*(?:=|:|is)?\\s*([A-Za-z0-9_-]+)`, "i"));
    if (match?.[1]) return match[1];
  }
  return undefined;
}

export function extractPtvDefaultsFromMemoryRows(rows: unknown[]): PtvDefaults | null {
  for (const row of rows) {
    const record = asRecord(row);
    const text =
      typeof row === "string"
        ? row
        : typeof record?.content === "string"
          ? record.content
          : typeof record?.fact === "string"
            ? record.fact
            : typeof record?.summary === "string"
              ? record.summary
              : "";
    if (!/ptv|public transport|train|station/i.test(text)) continue;

    const stopId = extractString(text, ["ptv_home_stop_id", "home_stop_id", "stop_id", "stop id"]);
    if (!stopId) continue;

    const defaults: PtvDefaults = { stop_id: stopId };
    const routeType = extractNumber(text, ["route_type", "route type"]);
    if (routeType !== undefined) defaults.route_type = routeType;

    const routeId = extractString(text, ["route_id", "route id"]);
    if (routeId) defaults.route_id = routeId;

    const directionId = extractString(text, ["direction_id", "direction id"]);
    if (directionId) defaults.direction_id = directionId;

    return defaults;
  }
  return null;
}

async function loadPtvDefaults(backend: DefaultableBackend): Promise<PtvDefaults | null> {
  const businessContext = await backend.getBusinessContext().catch(() => []);
  for (const row of businessContext) {
    const record = asRecord(row);
    if (!record) continue;
    const category = String(record.category ?? "").toLowerCase();
    const key = String(record.key ?? "").toLowerCase();
    if (!["connector_defaults", "tool_defaults", "ptv"].includes(category)) continue;
    if (!["ptv", "ptv_home_station", "ptv_departures", "home_station"].includes(key)) continue;

    const defaults = normalizePtvDefaults(record.value);
    if (defaults) return defaults;
  }

  const memoryRows = await backend.searchMemory("PTV home station stop_id route_type", 5).catch(() => []);
  return extractPtvDefaultsFromMemoryRows(Array.isArray(memoryRows) ? memoryRows : []);
}

export async function applyToolMemoryDefaults(
  toolName: string,
  args: Record<string, unknown>,
  options: { backend?: DefaultableBackend } = {}
): Promise<ToolMemoryDefaultsResult> {
  if (toolName !== "ptv_departures" || args.stop_id !== undefined) {
    return { args, applied: [] };
  }

  const backend = options.backend ?? await getBackend();
  const defaults = await loadPtvDefaults(backend);
  if (!defaults?.stop_id) return { args, applied: [] };

  const nextArgs: Record<string, unknown> = { ...args };
  const applied: string[] = [];
  for (const [key, value] of Object.entries(defaults)) {
    if (nextArgs[key] !== undefined || value === undefined) continue;
    nextArgs[key] = value;
    applied.push(`memory.${key}`);
  }
  if (applied.length > 0) nextArgs.__unclick_memory_defaults = applied;
  return { args: nextArgs, applied };
}
