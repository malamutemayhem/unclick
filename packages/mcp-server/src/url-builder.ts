export class URLBuilder {
  private baseUrl: string;
  private pathSegments: string[] = [];
  private queryParams: [string, string][] = [];
  private hashFragment = "";

  constructor(base: string) {
    this.baseUrl = base.replace(/\/+$/, "");
  }

  path(...segments: string[]): this {
    for (const seg of segments) {
      this.pathSegments.push(encodeURIComponent(seg));
    }
    return this;
  }

  rawPath(...segments: string[]): this {
    for (const seg of segments) {
      this.pathSegments.push(seg);
    }
    return this;
  }

  query(key: string, value: string | number | boolean): this {
    this.queryParams.push([key, String(value)]);
    return this;
  }

  queryObject(obj: Record<string, string | number | boolean | undefined>): this {
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) this.query(key, value);
    }
    return this;
  }

  hash(fragment: string): this {
    this.hashFragment = fragment;
    return this;
  }

  build(): string {
    let url = this.baseUrl;
    if (this.pathSegments.length > 0) {
      url += "/" + this.pathSegments.join("/");
    }
    if (this.queryParams.length > 0) {
      const qs = this.queryParams
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&");
      url += "?" + qs;
    }
    if (this.hashFragment) {
      url += "#" + encodeURIComponent(this.hashFragment);
    }
    return url;
  }

  toString(): string { return this.build(); }
}

export function parseQueryString(qs: string): Record<string, string> {
  const result: Record<string, string> = {};
  const clean = qs.startsWith("?") ? qs.slice(1) : qs;
  if (!clean) return result;
  for (const pair of clean.split("&")) {
    const [key, ...rest] = pair.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(rest.join("="));
  }
  return result;
}

export function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const parts: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }
  return parts.length > 0 ? "?" + parts.join("&") : "";
}
