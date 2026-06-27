// Runtime helpers for the extension UI and worker.
// Hand-mirrored from packages/browser-extension/src/ (memory.ts, status.ts, coverage.ts,
// connector-draft.ts, redaction-report.ts). The TypeScript versions are authoritative and
// unit-tested. Keep this in sync until the Phase 7.2 bundler replaces it with a compiled bundle.

import { templatePath } from "./core.js";

export const DEFAULT_MCP_ENDPOINT = "https://unclick.world/api/mcp";
export const FACT_MAX_LEN = 4000;

// --- save to memory -------------------------------------------------------

export function composeFact({ fact, sourceUrl }) {
  const base = (fact ?? "").trim();
  if (!base) throw new Error("fact is empty");
  const combined = sourceUrl ? `${base}\n\nSource: ${sourceUrl}` : base;
  return combined.length > FACT_MAX_LEN ? combined.slice(0, FACT_MAX_LEN) : combined;
}

export function buildSaveFactRpc({ fact, category, sourceUrl }, id = 1) {
  return {
    jsonrpc: "2.0",
    id,
    method: "tools/call",
    params: {
      name: "save_fact",
      arguments: { fact: composeFact({ fact, sourceUrl }), category: category || "general" },
    },
  };
}

export function buildToolRpc(name, args, id = 1) {
  return { jsonrpc: "2.0", id, method: "tools/call", params: { name, arguments: args || {} } };
}

export function buildMcpRequest(endpoint, apiKey, rpc) {
  if (!endpoint) throw new Error("endpoint is required");
  if (!apiKey) throw new Error("apiKey is required");
  return {
    url: endpoint,
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json, text/event-stream",
      authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(rpc),
  };
}

// Unwrap an MCP tools/call result into plain data, tolerating shape drift.
export function parseMcpResult(json) {
  try {
    const content = json?.result?.content;
    if (Array.isArray(content) && content[0]?.text) {
      try {
        return JSON.parse(content[0].text);
      } catch {
        return content[0].text;
      }
    }
    return json?.result ?? json;
  } catch {
    return json;
  }
}

export function extractArray(data) {
  if (Array.isArray(data)) return data;
  if (!data || typeof data !== "object") return [];
  for (const key of ["connections", "platforms", "items", "results", "data"]) {
    if (Array.isArray(data[key])) return data[key];
  }
  return [];
}

// --- status ---------------------------------------------------------------

const CONNECTED_STATES = new Set(["connected", "verified", "healthy", "active", "ok"]);
const ATTENTION_STATES = new Set([
  "failing",
  "needs_attention",
  "expired",
  "error",
  "revoked",
  "disconnected",
]);

export function summarizeConnections(list) {
  let connected = 0;
  let needsAttention = 0;
  for (const c of list ?? []) {
    const state = (c.status ?? "").toLowerCase();
    const isAttention = c.healthy === false || ATTENTION_STATES.has(state);
    const isConnected = c.connected === true || CONNECTED_STATES.has(state);
    if (isAttention) needsAttention += 1;
    else if (isConnected) connected += 1;
  }
  return { total: (list ?? []).length, connected, needsAttention };
}

export function summarizeSignals(signals) {
  if (!signals) return { count: 0 };
  if (typeof signals.count === "number") return { count: signals.count };
  if (typeof signals.unread === "number") return { count: signals.unread };
  return { count: Array.isArray(signals.items) ? signals.items.length : 0 };
}

export function badgeText(connections, signals) {
  if (signals.count > 0) return signals.count > 99 ? "99+" : String(signals.count);
  if (connections.needsAttention > 0) return "!";
  return "";
}

// --- coverage -------------------------------------------------------------

const READ_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export function classifyOperation(method) {
  return READ_METHODS.has(String(method).toUpperCase()) ? "read" : "write";
}

export function coverageForHost(shapes) {
  let reads = 0;
  let writes = 0;
  for (const s of shapes ?? []) {
    if (classifyOperation(s.method) === "read") reads += 1;
    else writes += 1;
  }
  return { endpoints: (shapes ?? []).length, reads, writes };
}

export function coverageLabel(coverage) {
  if (coverage.endpoints === 0) return "nothing learned yet";
  return `${coverage.endpoints} endpoint(s): ${coverage.reads} read, ${coverage.writes} write`;
}

// --- redaction preview ----------------------------------------------------

function parseBody(body) {
  if (typeof body !== "string") return body;
  const t = body.trim();
  if (!t) return undefined;
  if ((t.startsWith("{") && t.endsWith("}")) || (t.startsWith("[") && t.endsWith("]"))) {
    try {
      return JSON.parse(t);
    } catch {
      return undefined;
    }
  }
  return undefined;
}

function walk(value, prefix, names, counter) {
  if (value === null || typeof value !== "object") {
    counter.values += 1;
    return;
  }
  if (Array.isArray(value)) {
    if (value.length) walk(value[0], `${prefix}[]`, names, counter);
    return;
  }
  for (const key of Object.keys(value).sort()) {
    const path = prefix ? `${prefix}.${key}` : key;
    names.push(path);
    walk(value[key], path, names, counter);
  }
}

export function describeRedaction(exchange) {
  const url = new URL(exchange.url);
  const counter = { values: 0 };
  const queryParamsKept = [...new Set([...url.searchParams.keys()])].sort();
  counter.values += [...url.searchParams.keys()].length;

  const bodyNames = [];
  walk(parseBody(exchange.requestBody), "request", bodyNames, counter);
  walk(parseBody(exchange.responseBody), "response", bodyNames, counter);

  return {
    pathTemplated: templatePath(url.pathname) !== url.pathname,
    pathTemplate: templatePath(url.pathname),
    queryParamsKept,
    bodyFieldsKept: [...new Set(bodyNames)].sort(),
    valuesDropped: counter.values,
  };
}
