export type TokenType =
  | "heading"
  | "paragraph"
  | "code_block"
  | "code_inline"
  | "bold"
  | "italic"
  | "link"
  | "image"
  | "list_item"
  | "blockquote"
  | "hr"
  | "text"
  | "newline";

export interface Token {
  type: TokenType;
  content: string;
  level?: number;
  url?: string;
  alt?: string;
  lang?: string;
}

export class MarkdownTokenizer {
  tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    const lines = input.split("\n");
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.match(/^#{1,6}\s/)) {
        const match = line.match(/^(#{1,6})\s+(.*)$/);
        if (match) {
          tokens.push({ type: "heading", content: match[2], level: match[1].length });
        }
        i++;
      } else if (line.startsWith("```")) {
        const lang = line.slice(3).trim();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        tokens.push({ type: "code_block", content: codeLines.join("\n"), lang: lang || undefined });
        i++;
      } else if (line.startsWith("> ")) {
        tokens.push({ type: "blockquote", content: line.slice(2) });
        i++;
      } else if (line.match(/^(\*{3,}|-{3,}|_{3,})$/)) {
        tokens.push({ type: "hr", content: "" });
        i++;
      } else if (line.match(/^[\*\-\+]\s/) || line.match(/^\d+\.\s/)) {
        const content = line.replace(/^[\*\-\+]\s/, "").replace(/^\d+\.\s/, "");
        tokens.push({ type: "list_item", content });
        i++;
      } else if (line.trim() === "") {
        tokens.push({ type: "newline", content: "" });
        i++;
      } else {
        tokens.push({ type: "paragraph", content: line });
        i++;
      }
    }
    return tokens;
  }

  tokenizeInline(text: string): Token[] {
    const tokens: Token[] = [];
    let remaining = text;
    while (remaining.length > 0) {
      let match: RegExpMatchArray | null;
      match = remaining.match(/^!\[([^\]]*)\]\(([^)]+)\)/);
      if (match) {
        tokens.push({ type: "image", content: match[1], url: match[2], alt: match[1] });
        remaining = remaining.slice(match[0].length);
        continue;
      }
      match = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
      if (match) {
        tokens.push({ type: "link", content: match[1], url: match[2] });
        remaining = remaining.slice(match[0].length);
        continue;
      }
      match = remaining.match(/^`([^`]+)`/);
      if (match) {
        tokens.push({ type: "code_inline", content: match[1] });
        remaining = remaining.slice(match[0].length);
        continue;
      }
      match = remaining.match(/^\*\*([^*]+)\*\*/);
      if (match) {
        tokens.push({ type: "bold", content: match[1] });
        remaining = remaining.slice(match[0].length);
        continue;
      }
      match = remaining.match(/^\*([^*]+)\*/);
      if (match) {
        tokens.push({ type: "italic", content: match[1] });
        remaining = remaining.slice(match[0].length);
        continue;
      }
      const nextSpecial = remaining.slice(1).search(/[`*!\[]/);
      if (nextSpecial === -1) {
        tokens.push({ type: "text", content: remaining });
        break;
      }
      tokens.push({ type: "text", content: remaining.slice(0, nextSpecial + 1) });
      remaining = remaining.slice(nextSpecial + 1);
    }
    return tokens;
  }

  static extractHeadings(tokens: Token[]): Token[] {
    return tokens.filter((t) => t.type === "heading");
  }

  static extractLinks(tokens: Token[]): Token[] {
    return tokens.filter((t) => t.type === "link" || t.type === "image");
  }

  static wordCount(tokens: Token[]): number {
    let count = 0;
    for (const t of tokens) {
      if (t.type === "heading" || t.type === "paragraph" || t.type === "list_item" || t.type === "blockquote") {
        count += t.content.split(/\s+/).filter(Boolean).length;
      }
    }
    return count;
  }
}
