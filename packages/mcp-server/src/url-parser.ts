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
  const result: ParsedUrl = { protocol: "", host: "", hostname: "", port: "", pathname: "", search: "", hash: "", params: {} };

  let remaining = url;

  const hashIdx = remaining.indexOf("#");
  if (hashIdx !== -1) {
    result.hash = remaining.slice(hashIdx);
    remaining = remaining.slice(0, hashIdx);
  }

  const searchIdx = remaining.indexOf("?");
  if (searchIdx !== -1) {
    result.search = remaining.slice(searchIdx);
    result.params = parseQueryString(remaining.slice(searchIdx + 1));
    remaining = remaining.slice(0, searchIdx);
  }

  const protoMatch = remaining.match(/^(\w+):\/\//);
  if (protoMatch) {
    result.protocol = protoMatch[1];
    remaining = remaining.slice(protoMatch[0].length);
  }

  const slashIdx = remaining.indexOf("/");
  if (slashIdx !== -1) {
    result.host = remaining.slice(0, slashIdx);
    result.pathname = remaining.slice(slashIdx);
  } else {
    result.host = remaining;
    result.pathname = "/";
  }

  const portMatch = result.host.match(/:(\d+)$/);
  if (portMatch) {
    result.port = portMatch[1];
    result.hostname = result.host.slice(0, -portMatch[0].length);
  } else {
    result.hostname = result.host;
  }

  return result;
}

export function parseQueryString(qs: string): Record<string, string> {
  const params: Record<string, string> = {};
  if (!qs) return params;
  for (const pair of qs.split("&")) {
    const [key, value] = pair.split("=");
    if (key) params[decodeURIComponent(key)] = decodeURIComponent(value ?? "");
  }
  return params;
}

export function buildQueryString(params: Record<string, string | number | boolean>): string {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
}

export function joinUrl(base: string, path: string): string {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : "/" + path;
  return b + p;
}
