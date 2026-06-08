export function box(text: string, options?: { padding?: number; border?: "single" | "double" | "round" }): string {
  const { padding = 1, border = "single" } = options || {};
  const chars = BORDERS[border];
  const lines = text.split("\n");
  const maxLen = Math.max(...lines.map((l) => l.length));
  const width = maxLen + padding * 2;

  const top = chars.tl + chars.h.repeat(width) + chars.tr;
  const bottom = chars.bl + chars.h.repeat(width) + chars.br;
  const pad = " ".repeat(padding);

  const middle = lines.map((line) => {
    const right = " ".repeat(maxLen - line.length);
    return `${chars.v}${pad}${line}${right}${pad}${chars.v}`;
  });

  return [top, ...middle, bottom].join("\n");
}

const BORDERS = {
  single: { tl: "+", tr: "+", bl: "+", br: "+", h: "-", v: "|" },
  double: { tl: "#", tr: "#", bl: "#", br: "#", h: "=", v: "#" },
  round: { tl: ".", tr: ".", bl: "'", br: "'", h: "-", v: "|" },
};

export function banner(text: string, char = "*"): string {
  const width = text.length + 4;
  const border = char.repeat(width);
  return [border, `${char} ${text} ${char}`, border].join("\n");
}

export function tree(data: TreeItem[], prefix = ""): string {
  const lines: string[] = [];
  data.forEach((item, i) => {
    const isLast = i === data.length - 1;
    const connector = isLast ? "`-- " : "|-- ";
    lines.push(prefix + connector + item.label);
    if (item.children && item.children.length > 0) {
      const childPrefix = prefix + (isLast ? "    " : "|   ");
      lines.push(tree(item.children, childPrefix));
    }
  });
  return lines.join("\n");
}

interface TreeItem {
  label: string;
  children?: TreeItem[];
}

export function progressBar(current: number, total: number, width = 30): string {
  const ratio = Math.min(current / total, 1);
  const filled = Math.round(width * ratio);
  const empty = width - filled;
  const bar = "=".repeat(filled) + (filled < width ? ">" : "") + " ".repeat(Math.max(0, empty - 1));
  const pct = (ratio * 100).toFixed(0);
  return `[${bar}] ${pct}%`;
}

export function sparkline(values: number[]): string {
  if (values.length === 0) return "";
  const chars = "▁▂▃▄▅▆▇█";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  return values.map((v) => {
    const idx = Math.round(((v - min) / range) * (chars.length - 1));
    return chars[idx];
  }).join("");
}

export function horizontalBar(label: string, value: number, maxValue: number, width = 20): string {
  const filled = Math.round((value / maxValue) * width);
  const bar = "#".repeat(filled) + " ".repeat(width - filled);
  return `${label.padEnd(10)} |${bar}| ${value}`;
}
