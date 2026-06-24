// The DRAFT step: merge observed shapes of one endpoint into a connector draft.
// Reads can become auto-promotable; writes are always consent-gated.

import { mergeSchemas } from "./shape.js";
import type { SchemaNode, Shape } from "./types.js";

export type Operation = "read" | "write";

export interface ConnectorDraft {
  host: string;
  method: string;
  pathTemplate: string;
  operation: Operation;
  queryParams: string[];
  requestSchema?: SchemaNode;
  responseSchema?: SchemaNode;
  /** True when an auth-style header name was observed on the request. */
  requiresAuthHeader: boolean;
  /** Writes always require explicit per-action consent. */
  requiresConsent: boolean;
  /** Reads only. The k-anonymity check is applied separately in privacy.ts. */
  autoPromotable: boolean;
  /** How many shapes were merged into this draft. */
  observationCount: number;
}

const AUTH_HEADER_NAMES = new Set([
  "authorization",
  "cookie",
  "x-api-key",
  "x-auth-token",
  "x-csrf-token",
]);

const READ_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

/** Stable key for grouping shapes that describe the same endpoint. */
export function endpointKey(shape: Shape): string {
  return `${shape.method} ${shape.host}${shape.pathTemplate}`;
}

export function classifyOperation(method: string): Operation {
  return READ_METHODS.has(method.toUpperCase()) ? "read" : "write";
}

function mergeOptional(
  nodes: Array<SchemaNode | undefined>,
): SchemaNode | undefined {
  const defined = nodes.filter((n): n is SchemaNode => !!n);
  return defined.length ? mergeSchemas(defined) : undefined;
}

/** Merge one or more shapes of the same endpoint into a connector draft. */
export function draftConnector(shapes: Shape[]): ConnectorDraft {
  if (!shapes.length) {
    throw new Error("draftConnector requires at least one shape");
  }
  const first = shapes[0];
  const operation = classifyOperation(first.method);
  return {
    host: first.host,
    method: first.method.toUpperCase(),
    pathTemplate: first.pathTemplate,
    operation,
    queryParams: [...new Set(shapes.flatMap((s) => s.queryParams))].sort(),
    requestSchema: mergeOptional(shapes.map((s) => s.requestSchema)),
    responseSchema: mergeOptional(shapes.map((s) => s.responseSchema)),
    requiresAuthHeader: shapes.some((s) =>
      s.requestHeaderNames.some((h) => AUTH_HEADER_NAMES.has(h)),
    ),
    requiresConsent: operation === "write",
    autoPromotable: operation === "read",
    observationCount: shapes.length,
  };
}
