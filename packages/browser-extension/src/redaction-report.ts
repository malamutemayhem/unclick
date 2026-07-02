// Redaction preview: a value-free report of what the strip step did to an exchange.
// The report lists field NAMES (which are kept anyway) and COUNTS of dropped values.
// It deliberately contains no captured values, so the report itself is safe to show or log.

import { templatePath } from "./shape.js";
import type { CapturedExchange } from "./types.js";

export interface RedactionReport {
  /** True when one or more id-like path segments were templated to {id}. */
  pathTemplated: boolean;
  /** Query parameter names kept (values dropped). */
  queryParamsKept: string[];
  /** Request header names kept (values dropped). */
  requestHeadersKept: string[];
  /** Response header names kept (values dropped). */
  responseHeadersKept: string[];
  /** Dotted body field names kept (values dropped). */
  bodyFieldsKept: string[];
  /** Count of primitive values removed across url, headers, and bodies. */
  valuesDropped: number;
}

function lower(keys: string[] | undefined): string[] {
  if (!keys) return [];
  return [...new Set(keys.map((k) => k.toLowerCase()))].sort();
}

function parseBody(body: unknown): unknown {
  if (typeof body !== "string") return body;
  const t = body.trim();
  if (!t) return undefined;
  if (
    (t.startsWith("{") && t.endsWith("}")) ||
    (t.startsWith("[") && t.endsWith("]"))
  ) {
    try {
      return JSON.parse(t);
    } catch {
      return undefined;
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
  return undefined;
}

/** Walk a value, collecting field-name paths and counting primitive leaves. */
function walk(
  value: unknown,
  prefix: string,
  names: string[],
  counter: { values: number },
): void {
  if (value === null || typeof value !== "object") {
    counter.values += 1;
    return;
  }
  if (Array.isArray(value)) {
    // Only descend the first element to keep the preview bounded.
    if (value.length) walk(value[0], `${prefix}[]`, names, counter);
    return;
  }
  for (const key of Object.keys(value).sort()) {
    const path = prefix ? `${prefix}.${key}` : key;
    names.push(path);
    walk((value as Record<string, unknown>)[key], path, names, counter);
  }
}

/** Produce a value-free description of what stripping removed from an exchange. */
export function describeRedaction(exchange: CapturedExchange): RedactionReport {
  const url = new URL(exchange.url);
  const counter = { values: 0 };

  const queryParamsKept = [...new Set([...url.searchParams.keys()])].sort();
  counter.values += [...url.searchParams.keys()].length;

  const requestHeadersKept = lower(
    exchange.requestHeaders ? Object.keys(exchange.requestHeaders) : undefined,
  );
  counter.values += exchange.requestHeaders
    ? Object.keys(exchange.requestHeaders).length
    : 0;

  const responseHeadersKept = lower(
    exchange.responseHeaders ? Object.keys(exchange.responseHeaders) : undefined,
  );
  counter.values += exchange.responseHeaders
    ? Object.keys(exchange.responseHeaders).length
    : 0;

  const bodyNames: string[] = [];
  walk(parseBody(exchange.requestBody), "request", bodyNames, counter);
  walk(parseBody(exchange.responseBody), "response", bodyNames, counter);

  return {
    pathTemplated: templatePath(url.pathname) !== url.pathname,
    queryParamsKept,
    requestHeadersKept,
    responseHeadersKept,
    bodyFieldsKept: [...new Set(bodyNames)].sort(),
    valuesDropped: counter.values,
  };
}
