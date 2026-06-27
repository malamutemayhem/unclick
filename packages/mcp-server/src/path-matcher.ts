interface RouteMatch<T> {
  params: Record<string, string>;
  value: T;
}

interface Route<T> {
  pattern: string;
  segments: Segment[];
  value: T;
}

type Segment =
  | { type: "static"; value: string }
  | { type: "param"; name: string }
  | { type: "wildcard" };

function parsePattern(pattern: string): Segment[] {
  return pattern.split("/").filter(Boolean).map((seg) => {
    if (seg === "*" || seg === "**") return { type: "wildcard" };
    if (seg.startsWith(":")) return { type: "param", name: seg.slice(1) };
    return { type: "static", value: seg };
  });
}

export class PathRouter<T> {
  private routes: Route<T>[] = [];

  add(pattern: string, value: T): void {
    this.routes.push({ pattern, segments: parsePattern(pattern), value });
  }

  match(path: string): RouteMatch<T> | null {
    const pathParts = path.split("/").filter(Boolean);

    for (const route of this.routes) {
      const params = matchSegments(route.segments, pathParts);
      if (params !== null) {
        return { params, value: route.value };
      }
    }
    return null;
  }

  matchAll(path: string): RouteMatch<T>[] {
    const pathParts = path.split("/").filter(Boolean);
    const results: RouteMatch<T>[] = [];

    for (const route of this.routes) {
      const params = matchSegments(route.segments, pathParts);
      if (params !== null) {
        results.push({ params, value: route.value });
      }
    }
    return results;
  }

  get size(): number {
    return this.routes.length;
  }
}

function matchSegments(segments: Segment[], parts: string[]): Record<string, string> | null {
  const params: Record<string, string> = {};
  let si = 0;
  let pi = 0;

  while (si < segments.length && pi < parts.length) {
    const seg = segments[si];
    if (seg.type === "static") {
      if (seg.value !== parts[pi]) return null;
      si++;
      pi++;
    } else if (seg.type === "param") {
      params[seg.name] = parts[pi];
      si++;
      pi++;
    } else if (seg.type === "wildcard") {
      if (si === segments.length - 1) {
        params["*"] = parts.slice(pi).join("/");
        return params;
      }
      si++;
      pi++;
    }
  }

  if (si === segments.length && pi === parts.length) return params;
  return null;
}

export function matchPath(pattern: string, path: string): Record<string, string> | null {
  const segments = parsePattern(pattern);
  const parts = path.split("/").filter(Boolean);
  return matchSegments(segments, parts);
}

export function buildPath(pattern: string, params: Record<string, string>): string {
  return "/" + pattern.split("/").filter(Boolean).map((seg) => {
    if (seg.startsWith(":")) {
      const name = seg.slice(1);
      if (!(name in params)) throw new Error(`Missing param: ${name}`);
      return params[name];
    }
    return seg;
  }).join("/");
}
