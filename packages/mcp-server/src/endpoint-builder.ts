// Type-safe endpoint URL construction.
// Replaces ad-hoc string concatenation across 100+ connector files with
// a builder that handles path params, query params, encoding, and
// trailing slash normalization.

export interface EndpointConfig {
  base: string;
  path?: string;
  pathParams?: Record<string, string | number>;
  queryParams?: Record<string, string | number | boolean | undefined | null>;
  trailingSlash?: boolean;
}

export function buildEndpoint(config: EndpointConfig): string {
  let base = config.base.replace(/\/+$/, "");
  let path = config.path ?? "";

  if (config.pathParams) {
    for (const [key, value] of Object.entries(config.pathParams)) {
      path = path.replace(`:${key}`, encodeURIComponent(String(value)));
      path = path.replace(`{${key}}`, encodeURIComponent(String(value)));
    }
  }

  if (path && !path.startsWith("/")) {
    path = "/" + path;
  }

  let url = base + path;

  if (config.trailingSlash && !url.endsWith("/")) {
    url += "/";
  } else if (config.trailingSlash === false && url.endsWith("/") && url !== base + "/") {
    url = url.replace(/\/+$/, "");
  }

  const params = config.queryParams;
  if (params) {
    const parts: string[] = [];
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === null) continue;
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
    if (parts.length > 0) {
      url += "?" + parts.join("&");
    }
  }

  return url;
}

// Shorthand for common patterns.

export function apiUrl(base: string, path: string, params?: Record<string, string | number | boolean | undefined | null>): string {
  return buildEndpoint({ base, path, queryParams: params });
}

export function restResource(base: string, resource: string, id?: string | number): string {
  const path = id !== undefined ? `/${resource}/${id}` : `/${resource}`;
  return buildEndpoint({ base, path });
}

// Pagination query helpers.

export function withPagination(
  url: string,
  opts: { limit?: number; offset?: number; cursor?: string; page?: number },
): string {
  const sep = url.includes("?") ? "&" : "?";
  const parts: string[] = [];

  if (opts.limit !== undefined) parts.push(`limit=${opts.limit}`);
  if (opts.offset !== undefined) parts.push(`offset=${opts.offset}`);
  if (opts.cursor !== undefined) parts.push(`cursor=${encodeURIComponent(opts.cursor)}`);
  if (opts.page !== undefined) parts.push(`page=${opts.page}`);

  if (parts.length === 0) return url;
  return url + sep + parts.join("&");
}
