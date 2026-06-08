export type Format = "text" | "json" | "markdown" | "csv" | "xml";

export function formatAsJson(data: unknown, pretty = true): string {
  return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
}

export function formatAsMarkdownTable(headers: string[], rows: string[][]): string {
  const headerLine = `| ${headers.join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;
  const dataLines = rows.map((r) => `| ${r.join(" | ")} |`);
  return [headerLine, separator, ...dataLines].join("\n");
}

export function formatAsCsv(headers: string[], rows: string[][]): string {
  const escape = (s: string) => s.includes(",") || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
  const lines = [headers.map(escape).join(",")];
  for (const row of rows) lines.push(row.map(escape).join(","));
  return lines.join("\n");
}

export function formatAsXml(rootTag: string, data: Record<string, unknown>): string {
  const entries = Object.entries(data).map(([k, v]) => `  <${k}>${escapeXml(String(v))}</${k}>`);
  return `<${rootTag}>\n${entries.join("\n")}\n</${rootTag}>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function formatAsList(items: string[], ordered = false): string {
  return items.map((item, i) => ordered ? `${i + 1}. ${item}` : `- ${item}`).join("\n");
}

export function formatAsKeyValue(data: Record<string, unknown>, separator = ": "): string {
  return Object.entries(data).map(([k, v]) => `${k}${separator}${v}`).join("\n");
}

export function autoFormat(data: unknown, format: Format): string {
  switch (format) {
    case "json": return formatAsJson(data);
    case "text": return String(data);
    case "markdown": {
      if (Array.isArray(data)) return formatAsList(data.map(String));
      if (typeof data === "object" && data !== null) return formatAsKeyValue(data as Record<string, unknown>);
      return String(data);
    }
    case "csv": {
      if (!Array.isArray(data) || data.length === 0) return "";
      const first = data[0] as Record<string, unknown>;
      const headers = Object.keys(first);
      const rows = data.map((d) => headers.map((h) => String((d as Record<string, unknown>)[h] ?? "")));
      return formatAsCsv(headers, rows);
    }
    case "xml": {
      if (typeof data === "object" && data !== null && !Array.isArray(data)) {
        return formatAsXml("data", data as Record<string, unknown>);
      }
      return `<data>${String(data)}</data>`;
    }
  }
}
