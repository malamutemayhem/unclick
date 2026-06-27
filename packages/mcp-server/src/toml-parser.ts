export type TomlValue = string | number | boolean | Date | TomlValue[] | TomlTable;
export type TomlTable = { [key: string]: TomlValue };

export function parse(input: string): TomlTable {
  const lines = input.split("\n");
  const root: TomlTable = {};
  let current = root;
  let currentPath: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "" || line.startsWith("#")) continue;

    const tableMatch = line.match(/^\[([^\]]+)\]$/);
    if (tableMatch) {
      currentPath = tableMatch[1].split(".").map((s) => s.trim());
      current = ensurePath(root, currentPath);
      continue;
    }

    const arrayTableMatch = line.match(/^\[\[([^\]]+)\]\]$/);
    if (arrayTableMatch) {
      const path = arrayTableMatch[1].split(".").map((s) => s.trim());
      const parentPath = path.slice(0, -1);
      const key = path[path.length - 1];
      const parent = parentPath.length > 0 ? ensurePath(root, parentPath) : root;
      if (!Array.isArray(parent[key])) parent[key] = [];
      const table: TomlTable = {};
      (parent[key] as TomlValue[]).push(table);
      current = table;
      currentPath = path;
      continue;
    }

    const kvMatch = line.match(/^([^=]+)=(.*)$/);
    if (kvMatch) {
      const key = kvMatch[1].trim();
      const rawValue = kvMatch[2].trim();
      current[key] = parseValue(rawValue);
    }
  }

  return root;
}

function ensurePath(root: TomlTable, path: string[]): TomlTable {
  let current = root;
  for (const key of path) {
    if (!(key in current)) current[key] = {};
    const val = current[key];
    if (Array.isArray(val)) {
      current = val[val.length - 1] as TomlTable;
    } else {
      current = val as TomlTable;
    }
  }
  return current;
}

function parseValue(raw: string): TomlValue {
  if (raw.startsWith('"') && raw.endsWith('"')) {
    return raw.slice(1, -1).replace(/\\n/g, "\n").replace(/\\t/g, "\t").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  }
  if (raw.startsWith("'") && raw.endsWith("'")) {
    return raw.slice(1, -1);
  }
  if (raw === "true") return true;
  if (raw === "false") return false;
  if (raw.startsWith("[")) return parseArray(raw);
  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) return new Date(raw);
  if (raw.includes(".") && !isNaN(Number(raw))) return parseFloat(raw);
  if (!isNaN(Number(raw))) return parseInt(raw, 10);
  return raw;
}

function parseArray(raw: string): TomlValue[] {
  const inner = raw.slice(1, -1).trim();
  if (inner === "") return [];
  const items = splitCommas(inner);
  return items.map((item) => parseValue(item.trim()));
}

function splitCommas(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let current = "";
  let inString = false;
  let quote = "";
  for (const ch of s) {
    if (inString) {
      current += ch;
      if (ch === quote) inString = false;
      continue;
    }
    if (ch === '"' || ch === "'") {
      inString = true;
      quote = ch;
      current += ch;
    } else if (ch === "[") { depth++; current += ch; }
    else if (ch === "]") { depth--; current += ch; }
    else if (ch === "," && depth === 0) { parts.push(current); current = ""; }
    else { current += ch; }
  }
  if (current.trim()) parts.push(current);
  return parts;
}

export function stringify(obj: TomlTable, prefix = ""): string {
  const lines: string[] = [];
  const tables: [string, TomlTable][] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof Date)) {
      tables.push([prefix ? `${prefix}.${key}` : key, value as TomlTable]);
    } else {
      lines.push(`${key} = ${valueToString(value)}`);
    }
  }

  for (const [path, table] of tables) {
    lines.push("");
    lines.push(`[${path}]`);
    lines.push(stringify(table, path));
  }

  return lines.join("\n");
}

function valueToString(value: TomlValue): string {
  if (typeof value === "string") return `"${value}"`;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return `[${value.map(valueToString).join(", ")}]`;
  return "";
}
