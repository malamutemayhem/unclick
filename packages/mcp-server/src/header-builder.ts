// Standardized HTTP header construction.
// Replaces ad-hoc header objects across 200+ connectors with a
// builder that handles auth, content-type, and user-agent consistently.

export type AuthScheme =
  | { type: "bearer"; token: string }
  | { type: "basic"; username: string; password: string }
  | { type: "apikey"; headerName: string; value: string }
  | { type: "custom"; headers: Record<string, string> };

export interface HeaderOptions {
  auth?: AuthScheme;
  contentType?: string;
  accept?: string;
  userAgent?: string;
  extra?: Record<string, string>;
}

const DEFAULT_USER_AGENT = "UnClick-MCP/1.0";

export function buildHeaders(opts: HeaderOptions = {}): Record<string, string> {
  const headers: Record<string, string> = {};

  if (opts.auth) {
    applyAuth(headers, opts.auth);
  }

  if (opts.contentType) {
    headers["Content-Type"] = opts.contentType;
  }

  if (opts.accept) {
    headers["Accept"] = opts.accept;
  }

  headers["User-Agent"] = opts.userAgent ?? DEFAULT_USER_AGENT;

  if (opts.extra) {
    for (const [key, value] of Object.entries(opts.extra)) {
      headers[key] = value;
    }
  }

  return headers;
}

function applyAuth(headers: Record<string, string>, auth: AuthScheme): void {
  switch (auth.type) {
    case "bearer":
      headers["Authorization"] = `Bearer ${auth.token}`;
      break;
    case "basic": {
      const encoded = btoa(`${auth.username}:${auth.password}`);
      headers["Authorization"] = `Basic ${encoded}`;
      break;
    }
    case "apikey":
      headers[auth.headerName] = auth.value;
      break;
    case "custom":
      for (const [key, value] of Object.entries(auth.headers)) {
        headers[key] = value;
      }
      break;
  }
}

// Shortcuts for common patterns.

export function bearerHeaders(token: string, extra?: Record<string, string>): Record<string, string> {
  return buildHeaders({
    auth: { type: "bearer", token },
    contentType: "application/json",
    accept: "application/json",
    extra,
  });
}

export function apiKeyHeaders(headerName: string, value: string, extra?: Record<string, string>): Record<string, string> {
  return buildHeaders({
    auth: { type: "apikey", headerName, value },
    contentType: "application/json",
    accept: "application/json",
    extra,
  });
}

export function basicAuthHeaders(username: string, password: string, extra?: Record<string, string>): Record<string, string> {
  return buildHeaders({
    auth: { type: "basic", username, password },
    contentType: "application/json",
    accept: "application/json",
    extra,
  });
}
