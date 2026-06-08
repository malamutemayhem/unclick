export class UrlBuilder {
  private base: string;
  private pathParts: string[] = [];
  private queryParams = new Map<string, string[]>();
  private hashValue = "";

  constructor(base: string) {
    this.base = base.replace(/\/+$/, "");
  }

  path(...parts: string[]): this {
    for (const part of parts) {
      this.pathParts.push(part.replace(/^\/+|\/+$/g, ""));
    }
    return this;
  }

  param(key: string, value: string | number | boolean): this {
    const strVal = String(value);
    if (!this.queryParams.has(key)) this.queryParams.set(key, []);
    this.queryParams.get(key)!.push(strVal);
    return this;
  }

  params(obj: Record<string, string | number | boolean | undefined>): this {
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined) this.param(key, value);
    }
    return this;
  }

  hash(value: string): this {
    this.hashValue = value;
    return this;
  }

  toString(): string {
    let url = this.base;
    if (this.pathParts.length > 0) url += "/" + this.pathParts.join("/");
    if (this.queryParams.size > 0) {
      const pairs: string[] = [];
      for (const [key, values] of this.queryParams) {
        for (const v of values) {
          pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(v)}`);
        }
      }
      url += "?" + pairs.join("&");
    }
    if (this.hashValue) url += "#" + encodeURIComponent(this.hashValue);
    return url;
  }
}

export function parseQuery(query: string): Record<string, string> {
  const result: Record<string, string> = {};
  const cleaned = query.startsWith("?") ? query.slice(1) : query;
  if (!cleaned) return result;
  for (const pair of cleaned.split("&")) {
    const [key, ...rest] = pair.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(rest.join("="));
  }
  return result;
}

export function buildQuery(params: Record<string, string | number | boolean | undefined>): string {
  const pairs: string[] = [];
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  }
  return pairs.length > 0 ? "?" + pairs.join("&") : "";
}
