export class UrlBuilder {
  private base: string;
  private pathSegments: string[] = [];
  private params = new Map<string, string>();
  private hashFragment?: string;

  constructor(base: string) {
    this.base = base.replace(/\/+$/, "");
  }

  path(...segments: string[]): this {
    for (const seg of segments) {
      this.pathSegments.push(encodeURIComponent(seg));
    }
    return this;
  }

  rawPath(segment: string): this {
    this.pathSegments.push(segment);
    return this;
  }

  query(key: string, value: string | number | boolean | undefined): this {
    if (value !== undefined) {
      this.params.set(key, String(value));
    }
    return this;
  }

  queryIf(condition: boolean, key: string, value: string | number | boolean): this {
    if (condition) this.params.set(key, String(value));
    return this;
  }

  hash(fragment: string): this {
    this.hashFragment = fragment;
    return this;
  }

  toString(): string {
    let url = this.base;
    if (this.pathSegments.length > 0) {
      url += "/" + this.pathSegments.join("/");
    }
    if (this.params.size > 0) {
      const qs = [...this.params.entries()]
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&");
      url += "?" + qs;
    }
    if (this.hashFragment) {
      url += "#" + encodeURIComponent(this.hashFragment);
    }
    return url;
  }

  build(): string {
    return this.toString();
  }
}

export function parseQueryString(qs: string): Record<string, string> {
  const result: Record<string, string> = {};
  const cleaned = qs.startsWith("?") ? qs.slice(1) : qs;
  if (!cleaned) return result;
  for (const pair of cleaned.split("&")) {
    const [key, ...rest] = pair.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(rest.join("="));
  }
  return result;
}
