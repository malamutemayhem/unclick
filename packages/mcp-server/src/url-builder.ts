export class URLBuilder {
  private base: string;
  private pathSegments: string[] = [];
  private params = new Map<string, string[]>();
  private hashFragment = "";

  constructor(base: string) {
    this.base = base.replace(/\/+$/, "");
  }

  path(...segments: string[]): URLBuilder {
    for (const seg of segments) {
      this.pathSegments.push(encodeURIComponent(seg));
    }
    return this;
  }

  rawPath(...segments: string[]): URLBuilder {
    for (const seg of segments) {
      this.pathSegments.push(seg);
    }
    return this;
  }

  query(key: string, value: string | number | boolean): URLBuilder {
    const strVal = String(value);
    if (!this.params.has(key)) {
      this.params.set(key, []);
    }
    this.params.get(key)!.push(strVal);
    return this;
  }

  queryIf(condition: boolean, key: string, value: string | number | boolean): URLBuilder {
    if (condition) this.query(key, value);
    return this;
  }

  hash(fragment: string): URLBuilder {
    this.hashFragment = fragment;
    return this;
  }

  toString(): string {
    let url = this.base;
    if (this.pathSegments.length > 0) {
      url += "/" + this.pathSegments.join("/");
    }
    if (this.params.size > 0) {
      const parts: string[] = [];
      for (const [key, values] of this.params) {
        for (const val of values) {
          parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
        }
      }
      url += "?" + parts.join("&");
    }
    if (this.hashFragment) {
      url += "#" + this.hashFragment;
    }
    return url;
  }

  clone(): URLBuilder {
    const b = new URLBuilder(this.base);
    b.pathSegments = [...this.pathSegments];
    b.hashFragment = this.hashFragment;
    for (const [k, v] of this.params) {
      b.params.set(k, [...v]);
    }
    return b;
  }
}

export function parseQueryString(qs: string): Record<string, string> {
  const result: Record<string, string> = {};
  const clean = qs.startsWith("?") ? qs.slice(1) : qs;
  if (!clean) return result;
  for (const pair of clean.split("&")) {
    const [key, val] = pair.split("=");
    result[decodeURIComponent(key)] = decodeURIComponent(val || "");
  }
  return result;
}

export function buildQueryString(params: Record<string, string | number | boolean>): string {
  const parts: string[] = [];
  for (const [key, val] of Object.entries(params)) {
    parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(val))}`);
  }
  return parts.join("&");
}
