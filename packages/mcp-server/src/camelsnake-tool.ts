import { stampMeta, ConnectorMeta } from "./connector-meta.js";

function tokenize(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[-_./\\]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function toCamel(tokens: string[]): string {
  return tokens.map((t, i) =>
    i === 0 ? t.toLowerCase() : t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()
  ).join("");
}

function toPascal(tokens: string[]): string {
  return tokens.map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase()).join("");
}

function toSnake(tokens: string[]): string {
  return tokens.map((t) => t.toLowerCase()).join("_");
}

function toKebab(tokens: string[]): string {
  return tokens.map((t) => t.toLowerCase()).join("-");
}

function toConstant(tokens: string[]): string {
  return tokens.map((t) => t.toUpperCase()).join("_");
}

export async function camelsnakeConvert(args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text.trim() : "";
  if (!text) return { error: "text is required" };

  const tokens = tokenize(text);
  const target = typeof args.target === "string" ? args.target : "";

  const converters: Record<string, (t: string[]) => string> = {
    camel: toCamel,
    pascal: toPascal,
    snake: toSnake,
    kebab: toKebab,
    constant: toConstant,
  };

  if (target && converters[target]) {
    const meta: ConnectorMeta = {
      source: "local-computation",
      fetched_at: new Date().toISOString(),
      next_steps: ["Available targets: camel, pascal, snake, kebab, constant"],
    };
    return stampMeta({ input: text, target, output: converters[target](tokens), tokens }, meta);
  }

  const all: Record<string, string> = {};
  for (const [name, fn] of Object.entries(converters)) all[name] = fn(tokens);

  const meta: ConnectorMeta = {
    source: "local-computation",
    fetched_at: new Date().toISOString(),
    next_steps: ["Specify target for a single conversion: camel, pascal, snake, kebab, constant"],
  };
  return stampMeta({ input: text, tokens, conversions: all }, meta);
}
