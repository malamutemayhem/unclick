export interface OpenApiPath {
  method: string;
  path: string;
  summary?: string;
  description?: string;
  parameters?: Array<{
    name: string;
    in: "query" | "path" | "header";
    required: boolean;
    schema: Record<string, unknown>;
  }>;
  requestBody?: {
    contentType: string;
    schema: Record<string, unknown>;
  };
  responses: Record<string, {
    description: string;
    schema?: Record<string, unknown>;
  }>;
  tags?: string[];
}

export class OpenApiGenerator {
  private title: string;
  private version: string;
  private description: string;
  private paths: OpenApiPath[] = [];
  private tags: Set<string> = new Set();

  constructor(title: string, version: string, description = "") {
    this.title = title;
    this.version = version;
    this.description = description;
  }

  addPath(path: OpenApiPath): void {
    this.paths.push(path);
    if (path.tags) {
      for (const tag of path.tags) {
        this.tags.add(tag);
      }
    }
  }

  removePath(method: string, path: string): boolean {
    const idx = this.paths.findIndex(
      (p) => p.method === method && p.path === path,
    );
    if (idx < 0) return false;
    this.paths.splice(idx, 1);
    return true;
  }

  generate(): Record<string, unknown> {
    const pathMap: Record<string, Record<string, unknown>> = {};

    for (const p of this.paths) {
      if (!pathMap[p.path]) pathMap[p.path] = {};
      const operation: Record<string, unknown> = {};
      if (p.summary) operation.summary = p.summary;
      if (p.description) operation.description = p.description;
      if (p.tags) operation.tags = p.tags;

      if (p.parameters && p.parameters.length > 0) {
        operation.parameters = p.parameters;
      }

      if (p.requestBody) {
        operation.requestBody = {
          content: {
            [p.requestBody.contentType]: {
              schema: p.requestBody.schema,
            },
          },
        };
      }

      const responses: Record<string, unknown> = {};
      for (const [code, resp] of Object.entries(p.responses)) {
        const respObj: Record<string, unknown> = { description: resp.description };
        if (resp.schema) {
          respObj.content = {
            "application/json": { schema: resp.schema },
          };
        }
        responses[code] = respObj;
      }
      operation.responses = responses;

      pathMap[p.path][p.method.toLowerCase()] = operation;
    }

    return {
      openapi: "3.0.3",
      info: {
        title: this.title,
        version: this.version,
        description: this.description,
      },
      paths: pathMap,
      tags: Array.from(this.tags).map((t) => ({ name: t })),
    };
  }

  pathCount(): number {
    return this.paths.length;
  }

  tagList(): string[] {
    return Array.from(this.tags);
  }

  getPathsByTag(tag: string): OpenApiPath[] {
    return this.paths.filter((p) => p.tags?.includes(tag));
  }

  endpointList(): Array<{ method: string; path: string }> {
    return this.paths.map((p) => ({ method: p.method, path: p.path }));
  }
}
