function splitWords(str: string): string[] {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_\-./\s]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function toCamelCase(str: string): string {
  const words = splitWords(str);
  return words.map((w, i) =>
    i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  ).join("");
}

export function toPascalCase(str: string): string {
  return splitWords(str)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join("");
}

export function toSnakeCase(str: string): string {
  return splitWords(str).map((w) => w.toLowerCase()).join("_");
}

export function toKebabCase(str: string): string {
  return splitWords(str).map((w) => w.toLowerCase()).join("-");
}

export function toScreamingSnake(str: string): string {
  return splitWords(str).map((w) => w.toUpperCase()).join("_");
}

export function toTitleCase(str: string): string {
  return splitWords(str)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function toSentenceCase(str: string): string {
  const words = splitWords(str).map((w) => w.toLowerCase());
  if (words.length === 0) return "";
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(" ");
}

export function toDotCase(str: string): string {
  return splitWords(str).map((w) => w.toLowerCase()).join(".");
}

export function toPathCase(str: string): string {
  return splitWords(str).map((w) => w.toLowerCase()).join("/");
}

export function toConstantCase(str: string): string {
  return toScreamingSnake(str);
}

export function swapCase(str: string): string {
  return str
    .split("")
    .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join("");
}

export function detectCase(str: string): string {
  if (/^[a-z][a-zA-Z0-9]*$/.test(str) && /[A-Z]/.test(str)) return "camel";
  if (/^[A-Z][a-zA-Z0-9]*$/.test(str) && str.length > 1) return "pascal";
  if (/^[a-z0-9]+(_[a-z0-9]+)+$/.test(str)) return "snake";
  if (/^[A-Z0-9]+(_[A-Z0-9]+)+$/.test(str)) return "screaming_snake";
  if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(str)) return "kebab";
  if (/^[a-z0-9]+(\.[a-z0-9]+)+$/.test(str)) return "dot";
  return "unknown";
}
