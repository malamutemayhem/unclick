export interface ToolDefinition {
  name: string;
  description: string;
  parameters: Record<string, ParameterDef>;
  handler: (params: Record<string, unknown>) => unknown | Promise<unknown>;
}

export interface ParameterDef {
  type: "string" | "number" | "boolean" | "array" | "object";
  description?: string;
  required?: boolean;
  default?: unknown;
}

export interface ToolCallResult {
  tool: string;
  result: unknown;
  durationMs: number;
  error?: string;
}

export class ToolRegistry {
  private tools = new Map<string, ToolDefinition>();

  register(tool: ToolDefinition): void {
    if (this.tools.has(tool.name)) {
      throw new Error(`Tool already registered: ${tool.name}`);
    }
    this.tools.set(tool.name, tool);
  }

  unregister(name: string): boolean {
    return this.tools.delete(name);
  }

  get(name: string): ToolDefinition | undefined {
    return this.tools.get(name);
  }

  has(name: string): boolean {
    return this.tools.has(name);
  }

  list(): ToolDefinition[] {
    return [...this.tools.values()];
  }

  names(): string[] {
    return [...this.tools.keys()];
  }

  search(query: string): ToolDefinition[] {
    const lower = query.toLowerCase();
    return this.list().filter(
      (t) => t.name.toLowerCase().includes(lower) || t.description.toLowerCase().includes(lower),
    );
  }

  async call(name: string, params: Record<string, unknown> = {}): Promise<ToolCallResult> {
    const tool = this.tools.get(name);
    if (!tool) throw new Error(`Unknown tool: ${name}`);

    const validated = this.validateParams(tool, params);
    const start = Date.now();
    try {
      const result = await tool.handler(validated);
      return { tool: name, result, durationMs: Date.now() - start };
    } catch (err) {
      return {
        tool: name,
        result: null,
        durationMs: Date.now() - start,
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  get size(): number {
    return this.tools.size;
  }

  clear(): void {
    this.tools.clear();
  }

  toSchema(): Record<string, unknown>[] {
    return this.list().map((t) => ({
      name: t.name,
      description: t.description,
      parameters: Object.fromEntries(
        Object.entries(t.parameters).map(([k, v]) => [k, { type: v.type, description: v.description, required: v.required }]),
      ),
    }));
  }

  private validateParams(tool: ToolDefinition, params: Record<string, unknown>): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, def] of Object.entries(tool.parameters)) {
      if (key in params) {
        result[key] = params[key];
      } else if (def.default !== undefined) {
        result[key] = def.default;
      } else if (def.required) {
        throw new Error(`Missing required parameter: ${key}`);
      }
    }
    return result;
  }
}
