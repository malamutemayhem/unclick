const SPECIAL_CHARS = /([\\`*_{}[\]()#+\-.!|~>])/g;

export function escape(text: string): string {
  return text.replace(SPECIAL_CHARS, "\\$1");
}

export function unescape(text: string): string {
  return text.replace(/\\([\\`*_{}[\]()#+\-.!|~>])/g, "$1");
}

export function bold(text: string): string {
  return `**${text}**`;
}

export function italic(text: string): string {
  return `*${text}*`;
}

export function code(text: string): string {
  if (text.includes("`")) return "`` " + text + " ``";
  return "`" + text + "`";
}

export function codeBlock(text: string, language = ""): string {
  return "```" + language + "\n" + text + "\n```";
}

export function link(text: string, url: string): string {
  return `[${text}](${url})`;
}

export function image(alt: string, url: string): string {
  return `![${alt}](${url})`;
}

export function heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6 = 1): string {
  return "#".repeat(level) + " " + text;
}

export function blockquote(text: string): string {
  return text.split("\n").map((line) => "> " + line).join("\n");
}

export function unorderedList(items: string[]): string {
  return items.map((item) => "- " + item).join("\n");
}

export function orderedList(items: string[]): string {
  return items.map((item, i) => `${i + 1}. ${item}`).join("\n");
}

export function strikethrough(text: string): string {
  return `~~${text}~~`;
}

export function table(headers: string[], rows: string[][]): string {
  const headerLine = "| " + headers.join(" | ") + " |";
  const sepLine = "| " + headers.map(() => "---").join(" | ") + " |";
  const dataLines = rows.map((row) => "| " + row.join(" | ") + " |");
  return [headerLine, sepLine, ...dataLines].join("\n");
}
