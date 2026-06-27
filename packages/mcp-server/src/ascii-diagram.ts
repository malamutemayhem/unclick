export interface DiagramNode {
  id: string;
  label: string;
  x?: number;
  y?: number;
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
}

export class AsciiDiagram {
  static flowchart(steps: string[]): string {
    const lines: string[] = [];
    for (let i = 0; i < steps.length; i++) {
      const boxWidth = steps[i].length + 4;
      const top = "+" + "-".repeat(boxWidth - 2) + "+";
      const mid = "| " + steps[i] + " |";
      lines.push(top, mid, top);
      if (i < steps.length - 1) {
        const pad = " ".repeat(Math.floor(boxWidth / 2));
        lines.push(pad + "|", pad + "v");
      }
    }
    return lines.join("\n");
  }

  static decision(question: string, yesPath: string, noPath: string): string {
    const maxLen = Math.max(question.length, yesPath.length, noPath.length);
    const pad = (s: string) => s.padEnd(maxLen);
    return [
      `  /${"/".repeat(maxLen + 2)}\\`,
      ` / ${pad(question)} \\`,
      `/${"/".repeat(maxLen + 4)}\\`,
      "",
      `  Yes: ${yesPath}`,
      `  No:  ${noPath}`,
    ].join("\n");
  }

  static sequence(actors: string[], messages: Array<{ from: number; to: number; msg: string }>): string {
    const colWidth = 20;
    const lines: string[] = [];

    const header = actors.map((a) => a.padStart(Math.floor((colWidth + a.length) / 2)).padEnd(colWidth)).join("");
    lines.push(header);

    const pipes = actors.map((_, i) => " ".repeat(Math.floor(colWidth / 2)) + "|" + " ".repeat(colWidth - Math.floor(colWidth / 2) - 1)).join("");
    lines.push(pipes);

    for (const msg of messages) {
      const fromPos = msg.from * colWidth + Math.floor(colWidth / 2);
      const toPos = msg.to * colWidth + Math.floor(colWidth / 2);
      const left = Math.min(fromPos, toPos);
      const right = Math.max(fromPos, toPos);
      const width = right - left;
      const arrow = msg.from < msg.to
        ? "-".repeat(width - 1) + ">"
        : "<" + "-".repeat(width - 1);
      const line = " ".repeat(left) + arrow + "  " + msg.msg;
      lines.push(line);
      lines.push(pipes);
    }

    return lines.join("\n");
  }

  static tree(label: string, children: string[]): string {
    const lines = [label];
    for (let i = 0; i < children.length; i++) {
      const isLast = i === children.length - 1;
      lines.push((isLast ? "  +-- " : "  |-- ") + children[i]);
    }
    return lines.join("\n");
  }

  static table(headers: string[], rows: string[][]): string {
    const widths = headers.map((h, i) => {
      const dataMax = Math.max(0, ...rows.map((r) => (r[i] || "").length));
      return Math.max(h.length, dataMax);
    });

    const sep = "+" + widths.map((w) => "-".repeat(w + 2)).join("+") + "+";
    const headerRow = "|" + headers.map((h, i) => " " + h.padEnd(widths[i]) + " ").join("|") + "|";
    const dataRows = rows.map((r) =>
      "|" + r.map((c, i) => " " + (c || "").padEnd(widths[i]) + " ").join("|") + "|",
    );

    return [sep, headerRow, sep, ...dataRows, sep].join("\n");
  }

  static banner(text: string, char: string = "*", padding: number = 2): string {
    const inner = " ".repeat(padding) + text + " ".repeat(padding);
    const border = char.repeat(inner.length + 2);
    return [border, char + inner + char, border].join("\n");
  }

  static divider(width: number = 60, char: string = "-"): string {
    return char.repeat(width);
  }
}
