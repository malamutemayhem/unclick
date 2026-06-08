export interface MatchResult {
  matched: boolean;
  params: Record<string, string>;
  path: string;
}

export class UrlPattern {
  private pattern: string;
  private segments: Array<{ type: "literal" | "param" | "wildcard"; value: string }>;
  private regex: RegExp;

  constructor(pattern: string) {
    this.pattern = pattern;
    this.segments = UrlPattern.parseSegments(pattern);
    this.regex = UrlPattern.buildRegex(this.segments);
  }

  private static parseSegments(
    pattern: string,
  ): Array<{ type: "literal" | "param" | "wildcard"; value: string }> {
    const parts = pattern.split("/").filter((p) => p.length > 0);
    return parts.map((part) => {
      if (part.startsWith(":")) {
        return { type: "param", value: part.slice(1) };
      }
      if (part === "*") {
        return { type: "wildcard", value: "*" };
      }
      return { type: "literal", value: part };
    });
  }

  private static buildRegex(
    segments: Array<{ type: "literal" | "param" | "wildcard"; value: string }>,
  ): RegExp {
    const parts = segments.map((seg) => {
      if (seg.type === "param") return "([^/]+)";
      if (seg.type === "wildcard") return "(.+)";
      return seg.value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    });
    return new RegExp(`^/${parts.join("/")}$`);
  }

  match(path: string): MatchResult {
    const m = path.match(this.regex);
    if (!m) return { matched: false, params: {}, path };

    const params: Record<string, string> = {};
    let paramIdx = 1;
    for (const seg of this.segments) {
      if (seg.type === "param") {
        params[seg.value] = m[paramIdx++];
      } else if (seg.type === "wildcard") {
        params["*"] = m[paramIdx++];
      }
    }
    return { matched: true, params, path };
  }

  test(path: string): boolean {
    return this.regex.test(path);
  }

  getPattern(): string {
    return this.pattern;
  }

  getParamNames(): string[] {
    return this.segments.filter((s) => s.type === "param").map((s) => s.value);
  }

  build(params: Record<string, string>): string {
    const parts = this.segments.map((seg) => {
      if (seg.type === "param") {
        return params[seg.value] || "";
      }
      return seg.value;
    });
    return "/" + parts.join("/");
  }

  static fromExpress(route: string): UrlPattern {
    return new UrlPattern(route);
  }
}

export class UrlRouter<T = unknown> {
  private routes: Array<{ pattern: UrlPattern; handler: T }> = [];

  add(pattern: string, handler: T): void {
    this.routes.push({ pattern: new UrlPattern(pattern), handler });
  }

  match(path: string): { handler: T; params: Record<string, string> } | null {
    for (const route of this.routes) {
      const result = route.pattern.match(path);
      if (result.matched) {
        return { handler: route.handler, params: result.params };
      }
    }
    return null;
  }

  routeCount(): number {
    return this.routes.length;
  }

  allPatterns(): string[] {
    return this.routes.map((r) => r.pattern.getPattern());
  }
}
