export interface TemplateOptions {
  openTag?: string;
  closeTag?: string;
  strip?: boolean;
}

interface CompiledPart {
  type: "text" | "expr" | "if" | "endif" | "each" | "endeach" | "else";
  content: string;
}

export function compile(template: string, options: TemplateOptions = {}): (data: Record<string, unknown>) => string {
  const { openTag = "{{", closeTag = "}}", strip = true } = options;
  const parts = parse(template, openTag, closeTag, strip);
  return (data: Record<string, unknown>) => evaluate(parts, data);
}

export function render(template: string, data: Record<string, unknown>, options: TemplateOptions = {}): string {
  return compile(template, options)(data);
}

function parse(template: string, open: string, close: string, strip: boolean): CompiledPart[] {
  const parts: CompiledPart[] = [];
  let pos = 0;

  while (pos < template.length) {
    const start = template.indexOf(open, pos);
    if (start === -1) {
      parts.push({ type: "text", content: template.slice(pos) });
      break;
    }

    if (start > pos) {
      parts.push({ type: "text", content: template.slice(pos, start) });
    }

    const end = template.indexOf(close, start + open.length);
    if (end === -1) {
      parts.push({ type: "text", content: template.slice(pos) });
      break;
    }

    const raw = template.slice(start + open.length, end);
    const expr = strip ? raw.trim() : raw;

    if (expr.startsWith("#if ")) {
      parts.push({ type: "if", content: expr.slice(4).trim() });
    } else if (expr === "/if") {
      parts.push({ type: "endif", content: "" });
    } else if (expr.startsWith("#each ")) {
      parts.push({ type: "each", content: expr.slice(6).trim() });
    } else if (expr === "/each") {
      parts.push({ type: "endeach", content: "" });
    } else if (expr === "else") {
      parts.push({ type: "else", content: "" });
    } else {
      parts.push({ type: "expr", content: expr });
    }

    pos = end + close.length;
  }

  return parts;
}

function evaluate(parts: CompiledPart[], data: Record<string, unknown>): string {
  let result = "";
  let i = 0;

  while (i < parts.length) {
    const part = parts[i];

    if (part.type === "text") {
      result += part.content;
      i++;
    } else if (part.type === "expr") {
      result += String(resolve(data, part.content) ?? "");
      i++;
    } else if (part.type === "if") {
      const condition = resolve(data, part.content);
      const { trueBranch, falseBranch, endIdx } = collectBranches(parts, i);
      if (isTruthy(condition)) {
        result += evaluate(trueBranch, data);
      } else {
        result += evaluate(falseBranch, data);
      }
      i = endIdx + 1;
    } else if (part.type === "each") {
      const match = part.content.match(/^(\S+)\s+as\s+(\S+)$/);
      if (match) {
        const arr = resolve(data, match[1]);
        const varName = match[2];
        const { body, endIdx } = collectLoop(parts, i);
        if (Array.isArray(arr)) {
          for (const item of arr) {
            result += evaluate(body, { ...data, [varName]: item });
          }
        }
        i = endIdx + 1;
      } else {
        i++;
      }
    } else {
      i++;
    }
  }

  return result;
}

function resolve(data: Record<string, unknown>, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = data;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function isTruthy(value: unknown): boolean {
  if (Array.isArray(value)) return value.length > 0;
  return Boolean(value);
}

function collectBranches(parts: CompiledPart[], startIdx: number): { trueBranch: CompiledPart[]; falseBranch: CompiledPart[]; endIdx: number } {
  let depth = 0;
  const trueBranch: CompiledPart[] = [];
  const falseBranch: CompiledPart[] = [];
  let inElse = false;
  let endIdx = startIdx;

  for (let i = startIdx + 1; i < parts.length; i++) {
    if (parts[i].type === "if") depth++;
    if (parts[i].type === "endif") {
      if (depth === 0) { endIdx = i; break; }
      depth--;
    }
    if (parts[i].type === "else" && depth === 0) {
      inElse = true;
      continue;
    }
    if (inElse) falseBranch.push(parts[i]);
    else trueBranch.push(parts[i]);
  }

  return { trueBranch, falseBranch, endIdx };
}

function collectLoop(parts: CompiledPart[], startIdx: number): { body: CompiledPart[]; endIdx: number } {
  let depth = 0;
  const body: CompiledPart[] = [];
  let endIdx = startIdx;

  for (let i = startIdx + 1; i < parts.length; i++) {
    if (parts[i].type === "each") depth++;
    if (parts[i].type === "endeach") {
      if (depth === 0) { endIdx = i; break; }
      depth--;
    }
    body.push(parts[i]);
  }

  return { body, endIdx };
}
