export interface CacheDirective {
  directive: string;
  value?: number;
}

export class HttpHeader {
  static parseContentType(header: string): { mediaType: string; params: Record<string, string> } {
    const parts = header.split(";").map((s) => s.trim());
    const mediaType = parts[0].toLowerCase();
    const params: Record<string, string> = {};
    for (let i = 1; i < parts.length; i++) {
      const eq = parts[i].indexOf("=");
      if (eq > 0) {
        const key = parts[i].slice(0, eq).trim().toLowerCase();
        let val = parts[i].slice(eq + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) {
          val = val.slice(1, -1);
        }
        params[key] = val;
      }
    }
    return { mediaType, params };
  }

  static parseAccept(header: string): Array<{ mediaType: string; quality: number }> {
    return header
      .split(",")
      .map((part) => {
        const segments = part.trim().split(";");
        const mediaType = segments[0].trim();
        let quality = 1;
        for (let i = 1; i < segments.length; i++) {
          const seg = segments[i].trim();
          if (seg.startsWith("q=")) {
            quality = parseFloat(seg.slice(2));
          }
        }
        return { mediaType, quality };
      })
      .sort((a, b) => b.quality - a.quality);
  }

  static parseCacheControl(header: string): CacheDirective[] {
    return header.split(",").map((part) => {
      const trimmed = part.trim();
      const eq = trimmed.indexOf("=");
      if (eq > 0) {
        return {
          directive: trimmed.slice(0, eq).trim().toLowerCase(),
          value: parseInt(trimmed.slice(eq + 1).trim(), 10),
        };
      }
      return { directive: trimmed.toLowerCase() };
    });
  }

  static parseAuthorization(header: string): { scheme: string; credentials: string } {
    const spaceIdx = header.indexOf(" ");
    if (spaceIdx < 0) return { scheme: header, credentials: "" };
    return {
      scheme: header.slice(0, spaceIdx),
      credentials: header.slice(spaceIdx + 1),
    };
  }

  static buildContentType(mediaType: string, params?: Record<string, string>): string {
    let result = mediaType;
    if (params) {
      for (const [key, val] of Object.entries(params)) {
        result += `; ${key}=${val}`;
      }
    }
    return result;
  }

  static buildCacheControl(directives: CacheDirective[]): string {
    return directives
      .map((d) => (d.value !== undefined ? `${d.directive}=${d.value}` : d.directive))
      .join(", ");
  }

  static parseLinkHeader(header: string): Array<{ url: string; rel: string; [key: string]: string }> {
    return header.split(",").map((part) => {
      const urlMatch = part.match(/<([^>]+)>/);
      const url = urlMatch ? urlMatch[1] : "";
      const params: Record<string, string> = { url, rel: "" };
      const paramMatches = part.matchAll(/;\s*(\w+)="?([^";,]+)"?/g);
      for (const m of paramMatches) {
        params[m[1]] = m[2].trim();
      }
      return params as { url: string; rel: string; [key: string]: string };
    });
  }

  static parseSetCookie(header: string): {
    name: string;
    value: string;
    attributes: Record<string, string>;
  } {
    const parts = header.split(";").map((s) => s.trim());
    const [first, ...rest] = parts;
    const eq = first.indexOf("=");
    const name = eq > 0 ? first.slice(0, eq) : first;
    const value = eq > 0 ? first.slice(eq + 1) : "";
    const attributes: Record<string, string> = {};
    for (const attr of rest) {
      const aeq = attr.indexOf("=");
      if (aeq > 0) {
        attributes[attr.slice(0, aeq).trim().toLowerCase()] = attr.slice(aeq + 1).trim();
      } else {
        attributes[attr.toLowerCase()] = "true";
      }
    }
    return { name, value, attributes };
  }
}
