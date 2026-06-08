export interface ParsedUrl {
  protocol: string;
  host: string;
  hostname: string;
  port: string;
  pathname: string;
  search: string;
  hash: string;
  params: Record<string, string>;
}

export function parseUrl(url: string): ParsedUrl {
  const match = url.match(/^(https?):\/\/([^/?#]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/);
  if (!match) throw new Error(`Invalid URL: ${url}`);
  const hostPart = match[2];
  const colonIdx = hostPart.lastIndexOf(":");
  let hostname = hostPart;
  let port = "";
  if (colonIdx > 0) {
    const possiblePort = hostPart.slice(colonIdx + 1);
    if (/^\d+$/.test(possiblePort)) {
      hostname = hostPart.slice(0, colonIdx);
      port = possiblePort;
    }
  }
  const search = match[4] ?? "";
  return {
    protocol: match[1],
    host: hostPart,
    hostname,
    port,
    pathname: match[3] ?? "/",
    search,
    hash: match[5] ?? "",
    params: parseQueryString(search.startsWith("?") ? search.slice(1) : search),
  };
}

export function parseQueryString(qs: string): Record<string, string> {
  if (!qs) return {};
  const params: Record<string, string> = {};
  for (const pair of qs.split("&")) {
    const [key, ...rest] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(rest.join("="));
  }
  return params;
}

export function buildQueryString(params: Record<string, string>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }
  return parts.join("&");
}

export function buildUrl(base: string, params?: Record<string, string>): string {
  if (!params || Object.keys(params).length === 0) return base;
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}${buildQueryString(params)}`;
}

export function joinPath(...segments: string[]): string {
  return segments
    .map((s, i) => {
      if (i === 0) return s.replace(/\/+$/, "");
      if (i === segments.length - 1) return s.replace(/^\/+/, "");
      return s.replace(/^\/+|\/+$/g, "");
    })
    .filter(Boolean)
    .join("/");
}
