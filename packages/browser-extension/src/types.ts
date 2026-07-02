// Shared types for the discovery sensor core.
// The guiding rule: a Shape contains structure only, never captured values.

export type FieldType =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "array"
  | "object";

/** A type-only description of a JSON value. Carries no captured values. */
export interface SchemaNode {
  type: FieldType;
  /** True when this field was absent in some observed samples. */
  optional?: boolean;
  /** Present when type is "object" and keys are static field names. */
  fields?: Record<string, SchemaNode>;
  /** Present for arrays (item schema) or id-keyed maps (value schema). */
  items?: SchemaNode;
  /** Present when an object is keyed by dynamic ids rather than static names. */
  keyTemplate?: string;
}

/** A raw request/response pair as observed in the page. Never persisted as-is. */
export interface CapturedExchange {
  method: string;
  url: string;
  requestHeaders?: Record<string, string>;
  requestBody?: unknown;
  status?: number;
  responseHeaders?: Record<string, string>;
  responseBody?: unknown;
  timestamp?: number;
}

/** The structure-only result of stripping a CapturedExchange. Safe to keep and (when public) share. */
export interface Shape {
  method: string;
  host: string;
  /** Path with id-like segments replaced by {id}, e.g. /event/{id}/guests. */
  pathTemplate: string;
  /** Query parameter names only, sorted and deduped. Values never kept. */
  queryParams: string[];
  /** Request header names only (lowercased). Values never kept. */
  requestHeaderNames: string[];
  /** Response header names only (lowercased). Values never kept. */
  responseHeaderNames: string[];
  /** Type-only schema of the request body, if any. */
  requestSchema?: SchemaNode;
  /** Type-only schema of the response body, if any. */
  responseSchema?: SchemaNode;
  /** Status bucket such as 2xx, not the exact code. */
  statusClass?: string;
}
