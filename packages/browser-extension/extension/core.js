// Hand-mirrored from packages/browser-extension/src/ (shape.ts + privacy.ts).
// The TypeScript version is authoritative and unit-tested. Keep this in sync until the
// Phase 7.2 bundler step replaces this file with a compiled bundle of src/.

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const HEX_RE = /^[0-9a-f]{16,}$/i;
const NUMERIC_RE = /^\d+$/;
const OPAQUE_ID_RE = /^[A-Za-z0-9_-]{20,}$/;

export const DEFAULT_TIER = "me_only";

export function shouldCapture(tier) {
  return tier !== "off";
}

export function looksLikeId(segment) {
  if (!segment) return false;
  if (NUMERIC_RE.test(segment)) return true;
  if (UUID_RE.test(segment)) return true;
  if (HEX_RE.test(segment)) return true;
  if (OPAQUE_ID_RE.test(segment) && /\d/.test(segment)) return true;
  return false;
}

export function templatePath(pathname) {
  const out = pathname.split("/").map((seg) => (looksLikeId(seg) ? "{id}" : seg));
  return out.join("/") || "/";
}

function isPlainObject(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function inferSchema(value) {
  if (value === null || value === undefined) return { type: "null" };
  if (Array.isArray(value)) {
    if (!value.length) return { type: "array" };
    return { type: "array", items: mergeSchemas(value.map(inferSchema)) };
  }
  if (isPlainObject(value)) {
    const keys = Object.keys(value);
    if (keys.length > 1 && keys.every((k) => looksLikeId(k))) {
      return {
        type: "object",
        keyTemplate: "{id}",
        items: mergeSchemas(keys.map((k) => inferSchema(value[k]))),
      };
    }
    const fields = {};
    for (const k of keys.sort()) fields[k] = inferSchema(value[k]);
    return { type: "object", fields };
  }
  if (typeof value === "number") return { type: "number" };
  if (typeof value === "boolean") return { type: "boolean" };
  return { type: "string" };
}

export function mergeSchemas(nodes) {
  const defined = nodes.filter(Boolean);
  if (!defined.length) return { type: "null" };
  const nonNull = defined.find((n) => n.type !== "null") ?? defined[0];

  if (nonNull.type === "object") {
    const objs = defined.filter((n) => n.type === "object");
    const keyed = objs.find((n) => n.keyTemplate);
    if (keyed) {
      const itemNodes = objs.map((n) => n.items).filter(Boolean);
      return {
        type: "object",
        keyTemplate: "{id}",
        items: itemNodes.length ? mergeSchemas(itemNodes) : { type: "null" },
      };
    }
    const total = objs.length;
    const buckets = new Map();
    const counts = new Map();
    for (const o of objs) {
      for (const [k, v] of Object.entries(o.fields ?? {})) {
        buckets.set(k, [...(buckets.get(k) ?? []), v]);
        counts.set(k, (counts.get(k) ?? 0) + 1);
      }
    }
    const fields = {};
    for (const k of [...buckets.keys()].sort()) {
      const merged = mergeSchemas(buckets.get(k) ?? []);
      if ((counts.get(k) ?? 0) < total) merged.optional = true;
      fields[k] = merged;
    }
    return { type: "object", fields };
  }

  if (nonNull.type === "array") {
    const itemNodes = defined
      .filter((n) => n.type === "array")
      .map((n) => n.items)
      .filter(Boolean);
    return itemNodes.length
      ? { type: "array", items: mergeSchemas(itemNodes) }
      : { type: "array" };
  }

  return { type: nonNull.type };
}

function headerNames(headers) {
  if (!headers) return [];
  return [...new Set(Object.keys(headers).map((k) => k.toLowerCase()))].sort();
}

function coerceBody(body) {
  if (typeof body !== "string") return body;
  const t = body.trim();
  if (!t) return "<text>";
  const jsonish =
    (t.startsWith("{") && t.endsWith("}")) || (t.startsWith("[") && t.endsWith("]"));
  if (jsonish) {
    try {
      return JSON.parse(t);
    } catch {
      return "<text>";
    }
  }
  if (/^[^=&\s]+=[^&]*(&[^=&\s]+=[^&]*)*$/.test(t)) {
    const obj = {};
    for (const pair of t.split("&")) {
      const key = pair.split("=")[0];
      if (key) obj[decodeURIComponent(key)] = "";
    }
    return obj;
  }
  return "<text>";
}

export function extractShape(exchange) {
  const url = new URL(exchange.url);
  const shape = {
    method: String(exchange.method || "GET").toUpperCase(),
    host: url.host,
    pathTemplate: templatePath(url.pathname),
    queryParams: [...new Set([...url.searchParams.keys()])].sort(),
    requestHeaderNames: headerNames(exchange.requestHeaders),
    responseHeaderNames: headerNames(exchange.responseHeaders),
  };
  if (exchange.requestBody !== undefined) {
    shape.requestSchema = inferSchema(coerceBody(exchange.requestBody));
  }
  if (exchange.responseBody !== undefined) {
    shape.responseSchema = inferSchema(coerceBody(exchange.responseBody));
  }
  if (typeof exchange.status === "number") {
    shape.statusClass = `${Math.floor(exchange.status / 100)}xx`;
  }
  return shape;
}
