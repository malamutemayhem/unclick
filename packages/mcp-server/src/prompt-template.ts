export interface PromptVariable {
  name: string;
  description?: string;
  default?: string;
  required?: boolean;
}

export class PromptTemplate {
  private template: string;
  private variables: PromptVariable[];

  constructor(template: string, variables: PromptVariable[] = []) {
    this.template = template;
    this.variables = variables;
  }

  format(vars: Record<string, string>): string {
    let result = this.template;
    const missing: string[] = [];

    for (const v of this.variables) {
      const value = vars[v.name] ?? v.default;
      if (value === undefined && v.required) {
        missing.push(v.name);
      }
    }
    if (missing.length > 0) {
      throw new Error("Missing required variables: " + missing.join(", "));
    }

    result = result.replace(/\{\{(\w+)\}\}/g, (_, name) => {
      const value = vars[name];
      if (value !== undefined) return value;
      const def = this.variables.find((v) => v.name === name);
      return def?.default ?? "";
    });

    return result;
  }

  getVariables(): PromptVariable[] {
    return [...this.variables];
  }

  extractVariableNames(): string[] {
    const matches = this.template.match(/\{\{(\w+)\}\}/g) || [];
    return [...new Set(matches.map((m) => m.slice(2, -2)))];
  }

  static compose(...templates: PromptTemplate[]): PromptTemplate {
    const combined = templates.map((t) => t.template).join("\n\n");
    const allVars = templates.flatMap((t) => t.variables);
    const uniqueVars = [...new Map(allVars.map((v) => [v.name, v])).values()];
    return new PromptTemplate(combined, uniqueVars);
  }
}

export function buildSystemPrompt(parts: Array<{ role: string; content: string }>): string {
  return parts.map((p) => `# ${p.role}\n${p.content}`).join("\n\n");
}

export function injectContext(template: string, context: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => context[key] ?? "");
}
