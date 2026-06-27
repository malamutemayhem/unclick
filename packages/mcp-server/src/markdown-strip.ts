export function stripMarkdown(md: string): string {
  let text = md;
  text = text.replace(/^#{1,6}\s+/gm, "");
  text = text.replace(/\*\*(.+?)\*\*/g, "$1");
  text = text.replace(/__(.+?)__/g, "$1");
  text = text.replace(/\*(.+?)\*/g, "$1");
  text = text.replace(/_(.+?)_/g, "$1");
  text = text.replace(/~~(.+?)~~/g, "$1");
  text = text.replace(/`{3}[\s\S]*?`{3}/g, "");
  text = text.replace(/`(.+?)`/g, "$1");
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  text = text.replace(/^\s*[-*+]\s+/gm, "");
  text = text.replace(/^\s*\d+\.\s+/gm, "");
  text = text.replace(/^>\s+/gm, "");
  text = text.replace(/^---+$/gm, "");
  text = text.replace(/^\|.*\|$/gm, "");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

export function extractHeadings(md: string): { level: number; text: string }[] {
  const headings: { level: number; text: string }[] = [];
  const regex = /^(#{1,6})\s+(.+)$/gm;
  let match;
  while ((match = regex.exec(md)) !== null) {
    headings.push({ level: match[1].length, text: match[2].trim() });
  }
  return headings;
}

export function extractLinks(md: string): { text: string; url: string }[] {
  const links: { text: string; url: string }[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = regex.exec(md)) !== null) {
    links.push({ text: match[1], url: match[2] });
  }
  return links;
}

export function extractCodeBlocks(md: string): { language: string; code: string }[] {
  const blocks: { language: string; code: string }[] = [];
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(md)) !== null) {
    blocks.push({ language: match[1] || "", code: match[2].trim() });
  }
  return blocks;
}

export function wordCount(md: string): number {
  const plain = stripMarkdown(md);
  const words = plain.split(/\s+/).filter(Boolean);
  return words.length;
}
