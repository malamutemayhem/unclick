export interface TemplateContext {
  [key: string]: unknown;
}

export function compile(template: string): (ctx: TemplateContext) => string {
  const parts = parse(template);
  return (ctx: TemplateContext) => {
    return parts.map((part) => {
      if (part.type === "text") return part.value;
      if (part.type === "var") return resolve(ctx, part.value) ?? "";
      if (part.type === "if") {
        const val = resolve(ctx, part.condition!);
        return val ? render(part.body!, ctx) : render(part.elseBody ?? [], ctx);
      }
      if (part.type === "each") {
        const arr = resolve(ctx, part.condition!) as unknown[];
        if (!Array.isArray(arr)) return "";
        return arr.map((item, idx) => render(part.body!, { ...ctx, item, index: idx })).join("");
      }
      return "";
    }).join("");
  };
}

interface Part {
  type: "text" | "var" | "if" | "each";
  value: string;
  condition?: string;
  body?: Part[];
  elseBody?: Part[];
}

function parse(template: string): Part[] {
  const parts: Part[] = [];
  let i = 0;
  while (i < template.length) {
    const start = template.indexOf("{{", i);
    if (start === -1) {
      parts.push({ type: "text", value: template.slice(i) });
      break;
    }
    if (start > i) {
      parts.push({ type: "text", value: template.slice(i, start) });
    }
    const end = template.indexOf("}}", start);
    if (end === -1) {
      parts.push({ type: "text", value: template.slice(i) });
      break;
    }
    const expr = template.slice(start + 2, end).trim();
    if (expr.startsWith("#if ")) {
      const condition = expr.slice(4).trim();
      const closeTag = `{{/if}}`;
      const elseTag = `{{else}}`;
      const closeIdx = template.indexOf(closeTag, end + 2);
      if (closeIdx === -1) { i = end + 2; continue; }
      const inner = template.slice(end + 2, closeIdx);
      const elseIdx = inner.indexOf(elseTag);
      if (elseIdx >= 0) {
        parts.push({
          type: "if",
          value: "",
          condition,
          body: parse(inner.slice(0, elseIdx)),
          elseBody: parse(inner.slice(elseIdx + elseTag.length)),
        });
      } else {
        parts.push({ type: "if", value: "", condition, body: parse(inner) });
      }
      i = closeIdx + closeTag.length;
    } else if (expr.startsWith("#each ")) {
      const condition = expr.slice(6).trim();
      const closeTag = `{{/each}}`;
      const closeIdx = template.indexOf(closeTag, end + 2);
      if (closeIdx === -1) { i = end + 2; continue; }
      const inner = template.slice(end + 2, closeIdx);
      parts.push({ type: "each", value: "", condition, body: parse(inner) });
      i = closeIdx + closeTag.length;
    } else {
      parts.push({ type: "var", value: expr });
      i = end + 2;
    }
  }
  return parts;
}

function render(parts: Part[], ctx: TemplateContext): string {
  return compile(parts.map(partToString).join(""))(ctx);
}

function partToString(part: Part): string {
  if (part.type === "text") return part.value;
  if (part.type === "var") return `{{${part.value}}}`;
  return "";
}

function resolve(ctx: TemplateContext, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = ctx;
  for (const p of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[p];
  }
  return current;
}
