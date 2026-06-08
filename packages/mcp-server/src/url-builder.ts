export class URLBuilder {
  private base: string;
  private pathSegments: string[] = [];
  private queryParams = new Map<string, string>();
  private hashValue = "";

  constructor(base: string) {
    this.base = base.replace(/\/+$/, "");
  }

  path(...segments: string[]): this {
    for (const seg of segments) {
      this.pathSegments.push(encodeURIComponent(seg));
    }
    return this;
  }

  param(key: string, value: string | number | boolean): this {
    this.queryParams.set(key, String(value));
    return this;
  }

  params(obj: Record<string, string | number | boolean>): this {
    for (const [k, v] of Object.entries(obj)) {
      this.queryParams.set(k, String(v));
    }
    return this;
  }

  hash(value: string): this {
    this.hashValue = value;
    return this;
  }

  toString(): string {
    let url = this.base;
    if (this.pathSegments.length > 0) {
      url += "/" + this.pathSegments.join("/");
    }
    if (this.queryParams.size > 0) {
      const qs = [...this.queryParams.entries()]
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&");
      url += "?" + qs;
    }
    if (this.hashValue) {
      url += "#" + encodeURIComponent(this.hashValue);
    }
    return url;
  }

  build(): string {
    return this.toString();
  }
}

export function parseQuery(qs: string): Record<string, string> {
  const result: Record<string, string> = {};
  const clean = qs.startsWith("?") ? qs.slice(1) : qs;
  if (!clean) return result;
  for (const pair of clean.split("&")) {
    const [key, ...rest] = pair.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(rest.join("="));
  }
  return result;
}

export function buildQuery(params: Record<string, string | number | boolean>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
}
