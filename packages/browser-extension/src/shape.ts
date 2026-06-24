// The trust-critical engine: turn a captured exchange into a structure-only Shape.
// Every captured value is dropped here, on the device, before anything is stored.

import type { CapturedExchange, SchemaNode, Shape } from "./types.js";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const HEX_RE = /^[0-9a-f]{16,}$/i;
const NUMERIC_RE = /^\d+$/;
const OPAQUE_ID_RE = /^[A-Za-z0-9_-]{20,}$/;

/** Heuristic: does a path segment or object key look like a dynamic id (a value)? */
export function looksLikeId(segment: string): boolean {
  if (!segment) return false;
  if (NUMERIC_RE.test(segment)) return true;
  if (UUID_RE.test(segment)) return true;
  if (HEX_RE.test(segment)) return true;
  // long opaque tokens that contain at least one digit (slug-like ids)
  if (OPAQUE_ID_RE.test(segment) && /\d/.test(segment)) return true;
  return false;
}

/** Replace id-like path segments with {id} so the path is a template, not a value carrier. */
export function templatePath(pathname: string): string {
  const out = pathname.split("/").map((seg) => (looksLikeId(seg) ? "{id}" : seg));
  return out.join("/") || "/";
}

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** Build a type-only schema from a value. No values are retained. */
export function inferSchema(value: unknown): SchemaNode {
  if (value === null || value === undefined) return { type: "null" };
  if (Array.isArray(value)) {
    if (!value.length) return { type: "array" };
    return { type: "array", items: mergeSchemas(value.map(inferSchema)) };
  }
  if (isPlainObject(value)) {
    const keys = Object.keys(value);
    // An object keyed entirely by dynamic ids is a map of values-as-keys: collapse it.
    if (keys.length > 1 && keys.every((k) => looksLikeId(k))) {
      return {
        type: "object",
        keyTemplate: "{id}",
        items: mergeSchemas(keys.map((k) => inferSchema(value[k]))),
      };
    }
    const fields: Record<string, SchemaNode> = {};
    for (const k of keys.sort()) fields[k] = inferSchema(value[k]);
    return { type: "object", fields };
  }
  switch (typeof value) {
    case "number":
      return { type: "number" };
    case "boolean":
      return { type: "boolean" };
    default:
      return { type: "string" };
  }
}

/** Merge several schemas of the same logical field into one, marking partial fields optional. */
export function mergeSchemas(nodes: SchemaNode[]): SchemaNode {
  const defined = nodes.filter((n): n is SchemaNode => !!n);
  if (!defined.length) return { type: "null" };
  const nonNull = defined.find((n) => n.type !== "null") ?? defined[0];

  if (nonNull.type === "object") {
    const objs = defined.filter((n) => n.type === "object");
    const keyed = objs.find((n) => n.keyTemplate);
    if (keyed) {
      const itemNodes = objs
        .map((n) => n.items)
        .filter((n): n is SchemaNode => !!n);
      return {
        type: "object",
        keyTemplate: "{id}",
        items: itemNodes.length ? mergeSchemas(itemNodes) : { type: "null" },
      };
    }
    const total = objs.length;
    const buckets = new Map<string, SchemaNode[]>();
    const counts = new Map<string, number>();
    for (const o of objs) {
      for (const [k, v] of Object.entries(o.fields ?? {})) {
        buckets.set(k, [...(buckets.get(k) ?? []), v]);
        counts.set(k, (counts.get(k) ?? 0) + 1);
      }
    }
    const fields: Record<string, SchemaNode> = {};
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
      .filter((n): n is SchemaNode => !!n);
    return itemNodes.length
      ? { type: "array", items: mergeSchemas(itemNodes) }
      : { type: "array" };
  }

  return { type: nonNull.type };
}

function headerNames(headers?: Record<string, string>): string[] {
  if (!headers) return [];
  return [...new Set(Object.keys(headers).map((k) => k.toLowerCase()))].sort();
}

/**
 * Reduce a body to a value we can infer structure from without keeping content.
 * JSON is parsed (values stripped by inferSchema). Form-encoded bodies keep their
 * key names with empty values. Anything else becomes a placeholder.
 */
function coerceBody(body: unknown): unknown {
  if (typeof body !== "string") return body;
  const t = body.trim();
  if (!t) return "<text>";
  const jsonish =
    (t.startsWith("{") && t.endsWith("}")) ||
    (t.startsWith("[") && t.endsWith("]"));
  if (jsonish) {
    try {
      return JSON.parse(t);
    } catch {
      return "<text>";
    }
  }
  if (/^[^=&\s]+=[^&]*(&[^=&\s]+=[^&]*)*$/.test(t)) {
    const obj: Record<string, string> = {};
    for (const pair of t.split("&")) {
      const key = pair.split("=")[0];
      if (key) obj[decodeURIComponent(key)] = "";
    }
    return obj;
  }
  return "<text>";
}

/** Strip a captured exchange into a structure-only Shape. */
export function extractShape(exchange: CapturedExchange): Shape {
  const url = new URL(exchange.url);
  const shape: Shape = {
    method: exchange.method.toUpperCase(),
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
