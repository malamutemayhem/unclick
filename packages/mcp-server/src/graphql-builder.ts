export interface GqlField {
  name: string;
  alias?: string;
  args?: Record<string, unknown>;
  children?: GqlField[];
}

export class GraphQLBuilder {
  private operationType: "query" | "mutation" | "subscription";
  private operationName?: string;
  private variables: Record<string, string> = {};
  private fields: GqlField[] = [];

  constructor(type: "query" | "mutation" | "subscription" = "query", name?: string) {
    this.operationType = type;
    this.operationName = name;
  }

  static query(name?: string): GraphQLBuilder {
    return new GraphQLBuilder("query", name);
  }

  static mutation(name?: string): GraphQLBuilder {
    return new GraphQLBuilder("mutation", name);
  }

  static subscription(name?: string): GraphQLBuilder {
    return new GraphQLBuilder("subscription", name);
  }

  variable(name: string, type: string): this {
    this.variables[name] = type;
    return this;
  }

  field(name: string, children?: GqlField[]): this {
    this.fields.push({ name, children });
    return this;
  }

  fieldWithArgs(name: string, args: Record<string, unknown>, children?: GqlField[]): this {
    this.fields.push({ name, args, children });
    return this;
  }

  aliasedField(alias: string, name: string, args?: Record<string, unknown>, children?: GqlField[]): this {
    this.fields.push({ name, alias, args, children });
    return this;
  }

  build(): string {
    const parts: string[] = [];

    let header = this.operationType;
    if (this.operationName) header += ` ${this.operationName}`;

    const varEntries = Object.entries(this.variables);
    if (varEntries.length > 0) {
      const varDefs = varEntries.map(([n, t]) => `$${n}: ${t}`).join(", ");
      header += `(${varDefs})`;
    }

    parts.push(header + " {");

    for (const field of this.fields) {
      parts.push(GraphQLBuilder.renderField(field, 1));
    }

    parts.push("}");
    return parts.join("\n");
  }

  private static renderField(field: GqlField, depth: number): string {
    const indent = "  ".repeat(depth);
    let line = indent;

    if (field.alias) {
      line += `${field.alias}: `;
    }

    line += field.name;

    if (field.args && Object.keys(field.args).length > 0) {
      const argStr = Object.entries(field.args)
        .map(([k, v]) => `${k}: ${GraphQLBuilder.formatValue(v)}`)
        .join(", ");
      line += `(${argStr})`;
    }

    if (field.children && field.children.length > 0) {
      line += " {";
      const childLines = field.children.map((c) => GraphQLBuilder.renderField(c, depth + 1));
      return line + "\n" + childLines.join("\n") + "\n" + indent + "}";
    }

    return line;
  }

  private static formatValue(value: unknown): string {
    if (typeof value === "string") {
      if (value.startsWith("$")) return value;
      return `"${value}"`;
    }
    if (typeof value === "number" || typeof value === "boolean") {
      return String(value);
    }
    if (value === null) return "null";
    if (Array.isArray(value)) {
      return `[${value.map((v) => GraphQLBuilder.formatValue(v)).join(", ")}]`;
    }
    if (typeof value === "object") {
      const entries = Object.entries(value as Record<string, unknown>)
        .map(([k, v]) => `${k}: ${GraphQLBuilder.formatValue(v)}`)
        .join(", ");
      return `{${entries}}`;
    }
    return String(value);
  }

  fieldCount(): number {
    return this.fields.length;
  }

  getOperationType(): string {
    return this.operationType;
  }

  getOperationName(): string | undefined {
    return this.operationName;
  }

  getVariables(): Record<string, string> {
    return { ...this.variables };
  }
}
