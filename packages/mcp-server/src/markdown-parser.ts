export interface MarkdownToken {
  type: "heading" | "paragraph" | "code" | "blockquote" | "list" | "hr" | "blank";
  content: string;
  level?: number;
  language?: string;
  ordered?: boolean;
  items?: string[];
}

export function parseMarkdown(input: string): MarkdownToken[] {
  const tokens: MarkdownToken[] = [];
  const lines = input.split("\n");
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === "") {
      tokens.push({ type: "blank", content: "" });
      i++;
      continue;
    }

    if (/^#{1,6}\s/.test(line)) {
      const match = line.match(/^(#{1,6})\s+(.*)$/)!;
      tokens.push({ type: "heading", content: match[2], level: match[1].length });
      i++;
      continue;
    }

    if (/^---$|^\*\*\*$|^___$/.test(line.trim())) {
      tokens.push({ type: "hr", content: "" });
      i++;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim() || undefined;
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      tokens.push({ type: "code", content: codeLines.join("\n"), language });
      i++;
      continue;
    }

    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      tokens.push({ type: "blockquote", content: quoteLines.join("\n") });
      continue;
    }

    if (/^[-*+]\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*+]\s+/, ""));
        i++;
      }
      tokens.push({ type: "list", content: items.join("\n"), ordered: false, items });
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      tokens.push({ type: "list", content: items.join("\n"), ordered: true, items });
      continue;
    }

    const paraLines: string[] = [];
    while (i < lines.length && lines[i].trim() !== "" && !/^#{1,6}\s/.test(lines[i]) && !lines[i].startsWith("```")) {
      paraLines.push(lines[i]);
      i++;
    }
    tokens.push({ type: "paragraph", content: paraLines.join("\n") });
  }

  return tokens;
}

export function extractHeadings(input: string): Array<{ level: number; text: string }> {
  return parseMarkdown(input)
    .filter((t): t is MarkdownToken & { level: number } => t.type === "heading" && t.level !== undefined)
    .map((t) => ({ level: t.level!, text: t.content }));
}

export function extractLinks(input: string): Array<{ text: string; url: string }> {
  const links: Array<{ text: string; url: string }> = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(input)) !== null) {
    links.push({ text: match[1], url: match[2] });
  }
  return links;
}
