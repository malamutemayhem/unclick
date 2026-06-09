export interface RouteMatch<T> {
  handler: T;
  params: Record<string, string>;
  path: string;
}

interface RouteNode<T> {
  children: Map<string, RouteNode<T>>;
  paramChild?: { name: string; node: RouteNode<T> };
  wildcardHandler?: T;
  handler?: T;
  method?: string;
}

export class Router<T> {
  private root: RouteNode<T> = { children: new Map() };
  private routes: { method: string; pattern: string; handler: T }[] = [];

  add(method: string, pattern: string, handler: T): void {
    const parts = this.splitPath(pattern);
    let node = this.root;

    for (const part of parts) {
      if (part === "*") {
        node.wildcardHandler = handler;
        this.routes.push({ method, pattern, handler });
        return;
      }
      if (part.startsWith(":")) {
        const name = part.slice(1);
        if (!node.paramChild) {
          node.paramChild = { name, node: { children: new Map() } };
        }
        node = node.paramChild.node;
      } else {
        if (!node.children.has(part)) {
          node.children.set(part, { children: new Map() });
        }
        node = node.children.get(part)!;
      }
    }
    node.handler = handler;
    node.method = method;
    this.routes.push({ method, pattern, handler });
  }

  get(pattern: string, handler: T): void { this.add("GET", pattern, handler); }
  post(pattern: string, handler: T): void { this.add("POST", pattern, handler); }
  put(pattern: string, handler: T): void { this.add("PUT", pattern, handler); }
  del(pattern: string, handler: T): void { this.add("DELETE", pattern, handler); }
  patch(pattern: string, handler: T): void { this.add("PATCH", pattern, handler); }

  match(method: string, path: string): RouteMatch<T> | null {
    const parts = this.splitPath(path);
    return this.findMatch(this.root, parts, 0, {}, path);
  }

  lookup(path: string): RouteMatch<T> | null {
    return this.match("GET", path);
  }

  listRoutes(): { method: string; pattern: string }[] {
    return this.routes.map(({ method, pattern }) => ({ method, pattern }));
  }

  private findMatch(
    node: RouteNode<T>,
    parts: string[],
    idx: number,
    params: Record<string, string>,
    fullPath: string
  ): RouteMatch<T> | null {
    if (idx === parts.length) {
      if (node.handler !== undefined) {
        return { handler: node.handler, params: { ...params }, path: fullPath };
      }
      return null;
    }

    const part = parts[idx];

    const exactChild = node.children.get(part);
    if (exactChild) {
      const result = this.findMatch(exactChild, parts, idx + 1, params, fullPath);
      if (result) return result;
    }

    if (node.paramChild) {
      const newParams = { ...params, [node.paramChild.name]: part };
      const result = this.findMatch(node.paramChild.node, parts, idx + 1, newParams, fullPath);
      if (result) return result;
    }

    if (node.wildcardHandler !== undefined) {
      return { handler: node.wildcardHandler, params: { ...params }, path: fullPath };
    }

    return null;
  }

  private splitPath(path: string): string[] {
    return path.split("/").filter(Boolean);
  }
}

export function parseQueryString(qs: string): Record<string, string> {
  const params: Record<string, string> = {};
  const clean = qs.startsWith("?") ? qs.slice(1) : qs;
  if (!clean) return params;
  for (const pair of clean.split("&")) {
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value || "");
  }
  return params;
}

export function buildQueryString(params: Record<string, string>): string {
  const pairs = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`);
  return pairs.length > 0 ? `?${pairs.join("&")}` : "";
}

export function parsePath(url: string): { path: string; query: Record<string, string>; hash: string } {
  let hash = "";
  let rest = url;
  const hashIdx = rest.indexOf("#");
  if (hashIdx !== -1) {
    hash = rest.slice(hashIdx + 1);
    rest = rest.slice(0, hashIdx);
  }
  const qIdx = rest.indexOf("?");
  if (qIdx !== -1) {
    return { path: rest.slice(0, qIdx), query: parseQueryString(rest.slice(qIdx)), hash };
  }
  return { path: rest, query: {}, hash };
}
