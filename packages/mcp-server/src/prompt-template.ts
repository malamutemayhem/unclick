export interface PromptSection {
  role: "system" | "user" | "assistant";
  content: string;
  optional?: boolean;
}

export class PromptTemplate {
  private sections: PromptSection[] = [];
  private variables = new Map<string, string>();

  system(content: string, optional = false): this {
    this.sections.push({ role: "system", content, optional });
    return this;
  }

  user(content: string, optional = false): this {
    this.sections.push({ role: "user", content, optional });
    return this;
  }

  assistant(content: string, optional = false): this {
    this.sections.push({ role: "assistant", content, optional });
    return this;
  }

  set(key: string, value: string): this {
    this.variables.set(key, value);
    return this;
  }

  setAll(vars: Record<string, string>): this {
    for (const [k, v] of Object.entries(vars)) this.variables.set(k, v);
    return this;
  }

  build(): { role: string; content: string }[] {
    const messages: { role: string; content: string }[] = [];
    for (const section of this.sections) {
      let content = section.content;
      for (const [key, value] of this.variables) {
        content = content.split(`{{${key}}}`).join(value);
      }
      const hasUnresolved = /\{\{[^}]+\}\}/.test(content);
      if (hasUnresolved && section.optional) continue;
      messages.push({ role: section.role, content });
    }
    return messages;
  }

  buildString(separator = "\n\n"): string {
    return this.build().map((m) => `[${m.role}]\n${m.content}`).join(separator);
  }

  clone(): PromptTemplate {
    const t = new PromptTemplate();
    t.sections = [...this.sections];
    t.variables = new Map(this.variables);
    return t;
  }

  get sectionCount(): number {
    return this.sections.length;
  }
}

export function prompt(): PromptTemplate {
  return new PromptTemplate();
}
