import { stampMeta } from "./connector-meta.js";

export async function markdownToHtml(args: Record<string, unknown>) {
  const md = String(args.markdown ?? "").trim();
  if (!md) return { error: "markdown text is required" };
  let html = md;
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/`(.+?)`/g, "<code>$1</code>");
  html = html.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (m) => `<ul>\n${m}</ul>\n`);
  html = html.replace(/^(?!<[hulo]|<li)(.*\S.*)$/gm, "<p>$1</p>");
  return stampMeta({ html, input_length: md.length, output_length: html.length }, {
    source: "local markdown converter",
    fetched_at: new Date().toISOString(),
    next_steps: ["use the html output for rendering", "handles headings, bold, italic, code, links, lists"],
  });
}

export async function markdownStats(args: Record<string, unknown>) {
  const md = String(args.markdown ?? "").trim();
  if (!md) return { error: "markdown text is required" };
  const lines = md.split("\n");
  const headings = lines.filter(l => /^#{1,6} /.test(l)).length;
  const links = (md.match(/\[.+?\]\(.+?\)/g) || []).length;
  const codeBlocks = (md.match(/```/g) || []).length / 2;
  const boldPhrases = (md.match(/\*\*.+?\*\*/g) || []).length;
  const listItems = lines.filter(l => /^[-*+] /.test(l.trim()) || /^\d+\. /.test(l.trim())).length;
  const words = md.split(/\s+/).filter(Boolean).length;
  const chars = md.length;
  return stampMeta({ headings, links, code_blocks: Math.floor(codeBlocks), bold_phrases: boldPhrases, list_items: listItems, words, characters: chars, lines: lines.length }, {
    source: "local markdown analyzer",
    fetched_at: new Date().toISOString(),
    next_steps: ["check word count for content length", "review heading structure for organization"],
  });
}
