export function bold(text: string): string { return `**${text}**`; }
export function italic(text: string): string { return `*${text}*`; }
export function code(text: string): string { return `\`${text}\``; }
export function codeBlock(text: string, lang = ""): string { return `\`\`\`${lang}\n${text}\n\`\`\``; }
export function link(text: string, url: string): string { return `[${text}](${url})`; }
export function image(alt: string, url: string): string { return `![${alt}](${url})`; }
export function heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6 = 1): string { return `${"#".repeat(level)} ${text}`; }
export function blockquote(text: string): string { return text.split("\n").map((l) => `> ${l}`).join("\n"); }

export function orderedList(items: string[]): string {
  return items.map((item, i) => `${i + 1}. ${item}`).join("\n");
}

export function unorderedList(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

export function taskList(items: { text: string; done: boolean }[]): string {
  return items.map((item) => `- [${item.done ? "x" : " "}] ${item.text}`).join("\n");
}

export function hr(): string { return "---"; }

export function table(headers: string[], rows: string[][]): string {
  const headerLine = `| ${headers.join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;
  const dataLines = rows.map((row) => `| ${row.join(" | ")} |`);
  return [headerLine, separator, ...dataLines].join("\n");
}

export function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/^---$/gm, "");
}

export function extractLinks(text: string): { text: string; url: string }[] {
  const links: { text: string; url: string }[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    links.push({ text: match[1], url: match[2] });
  }
  return links;
}
