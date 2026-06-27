export class UriTemplate {
  private readonly template: string;
  private readonly parts: TemplatePart[];

  constructor(template: string) {
    this.template = template;
    this.parts = this.parse(template);
  }

  private parse(template: string): TemplatePart[] {
    const parts: TemplatePart[] = [];
    let remaining = template;
    while (remaining.length > 0) {
      const start = remaining.indexOf("{");
      if (start === -1) {
        parts.push({ type: "literal", value: remaining });
        break;
      }
      if (start > 0) {
        parts.push({ type: "literal", value: remaining.slice(0, start) });
      }
      const end = remaining.indexOf("}", start);
      if (end === -1) {
        parts.push({ type: "literal", value: remaining.slice(start) });
        break;
      }
      const expr = remaining.slice(start + 1, end);
      let operator = "";
      let varList = expr;
      if (/^[+#./;?&=,!@|]/.test(expr)) {
        operator = expr[0];
        varList = expr.slice(1);
      }
      const vars = varList.split(",").map((v) => {
        const explode = v.endsWith("*");
        const colonIdx = v.indexOf(":");
        let name = v;
        let maxLength: number | undefined;
        if (explode) name = v.slice(0, -1);
        if (colonIdx !== -1) {
          maxLength = parseInt(v.slice(colonIdx + 1));
          name = v.slice(0, colonIdx);
        }
        return { name: name.trim(), explode, maxLength };
      });
      parts.push({ type: "expression", operator, vars });
      remaining = remaining.slice(end + 1);
    }
    return parts;
  }

  expand(vars: Record<string, string | number | string[] | Record<string, string>>): string {
    return this.parts.map((part) => {
      if (part.type === "literal") return part.value!;
      return this.expandExpression(part, vars);
    }).join("");
  }

  private expandExpression(
    part: TemplatePart,
    vars: Record<string, string | number | string[] | Record<string, string>>
  ): string {
    const op = part.operator || "";
    const values: string[] = [];
    for (const v of part.vars!) {
      const val = vars[v.name];
      if (val === undefined || val === null) continue;
      if (Array.isArray(val)) {
        if (v.explode) {
          const sep = op === "?" || op === "&" ? "&" : ",";
          const prefix = op === "?" || op === "&" ? `${v.name}=` : "";
          values.push(val.map((item) => `${prefix}${this.encode(item, op)}`).join(sep));
        } else {
          values.push(val.map((item) => this.encode(String(item), op)).join(","));
        }
      } else if (typeof val === "object") {
        const entries = Object.entries(val);
        if (v.explode) {
          values.push(entries.map(([k, vv]) => `${this.encode(k, op)}=${this.encode(vv, op)}`).join(op === "?" || op === "&" ? "&" : ","));
        } else {
          values.push(entries.map(([k, vv]) => `${this.encode(k, op)},${this.encode(vv, op)}`).join(","));
        }
      } else {
        let s = String(val);
        if (v.maxLength !== undefined) s = s.slice(0, v.maxLength);
        if (op === "?" || op === "&") {
          values.push(`${v.name}=${this.encode(s, op)}`);
        } else {
          values.push(this.encode(s, op));
        }
      }
    }
    if (values.length === 0) return "";
    const separator = op === "?" ? "&" : op === "&" ? "&" : op === "." ? "." : op === "/" ? "/" : op === ";" ? ";" : ",";
    const prefix = op === "#" ? "#" : op === "." ? "." : op === "/" ? "/" : op === "?" ? "?" : op === "&" ? "&" : op === ";" ? ";" : "";
    return prefix + values.join(separator);
  }

  private encode(value: string, operator: string): string {
    if (operator === "+" || operator === "#") return encodeURI(value);
    return encodeURIComponent(value);
  }

  getVariableNames(): string[] {
    const names: string[] = [];
    for (const part of this.parts) {
      if (part.type === "expression") {
        for (const v of part.vars!) names.push(v.name);
      }
    }
    return names;
  }

  toString(): string {
    return this.template;
  }

  static expand(template: string, vars: Record<string, string | number | string[] | Record<string, string>>): string {
    return new UriTemplate(template).expand(vars);
  }
}

interface TemplatePart {
  type: "literal" | "expression";
  value?: string;
  operator?: string;
  vars?: { name: string; explode: boolean; maxLength?: number }[];
}
