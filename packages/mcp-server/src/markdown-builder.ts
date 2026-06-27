export class MarkdownBuilder {
  private lines: string[] = [];

  heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6 = 1): this {
    this.lines.push(`${"#".repeat(level)} ${text}`);
    return this;
  }

  paragraph(text: string): this {
    this.lines.push(text);
    this.lines.push("");
    return this;
  }

  bold(text: string): string {
    return `**${text}**`;
  }

  italic(text: string): string {
    return `*${text}*`;
  }

  code(text: string): string {
    return `\`${text}\``;
  }

  codeBlock(code: string, language = ""): this {
    this.lines.push(`\`\`\`${language}`);
    this.lines.push(code);
    this.lines.push("```");
    this.lines.push("");
    return this;
  }

  bulletList(items: string[]): this {
    for (const item of items) {
      this.lines.push(`- ${item}`);
    }
    this.lines.push("");
    return this;
  }

  numberedList(items: string[]): this {
    items.forEach((item, i) => {
      this.lines.push(`${i + 1}. ${item}`);
    });
    this.lines.push("");
    return this;
  }

  table(headers: string[], rows: string[][]): this {
    this.lines.push(`| ${headers.join(" | ")} |`);
    this.lines.push(`| ${headers.map(() => "---").join(" | ")} |`);
    for (const row of rows) {
      this.lines.push(`| ${row.join(" | ")} |`);
    }
    this.lines.push("");
    return this;
  }

  link(text: string, url: string): string {
    return `[${text}](${url})`;
  }

  image(alt: string, url: string): string {
    return `![${alt}](${url})`;
  }

  hr(): this {
    this.lines.push("---");
    this.lines.push("");
    return this;
  }

  blockquote(text: string): this {
    this.lines.push(`> ${text}`);
    this.lines.push("");
    return this;
  }

  raw(text: string): this {
    this.lines.push(text);
    return this;
  }

  build(): string {
    return this.lines.join("\n");
  }

  clear(): this {
    this.lines = [];
    return this;
  }
}
