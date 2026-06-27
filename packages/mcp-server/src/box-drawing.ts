export interface BoxStyle {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  horizontal: string;
  vertical: string;
  teeLeft: string;
  teeRight: string;
  teeTop: string;
  teeBottom: string;
  cross: string;
}

export class BoxDrawing {
  static readonly SINGLE: BoxStyle = {
    topLeft: "┌", topRight: "┐", bottomLeft: "└", bottomRight: "┘",
    horizontal: "─", vertical: "│",
    teeLeft: "┤", teeRight: "├", teeTop: "┴", teeBottom: "┬", cross: "┼",
  };

  static readonly DOUBLE: BoxStyle = {
    topLeft: "╔", topRight: "╗", bottomLeft: "╚", bottomRight: "╝",
    horizontal: "═", vertical: "║",
    teeLeft: "╣", teeRight: "╠", teeTop: "╩", teeBottom: "╦", cross: "╬",
  };

  static readonly ROUNDED: BoxStyle = {
    topLeft: "╭", topRight: "╮", bottomLeft: "╰", bottomRight: "╯",
    horizontal: "─", vertical: "│",
    teeLeft: "┤", teeRight: "├", teeTop: "┴", teeBottom: "┬", cross: "┼",
  };

  static readonly ASCII: BoxStyle = {
    topLeft: "+", topRight: "+", bottomLeft: "+", bottomRight: "+",
    horizontal: "-", vertical: "|",
    teeLeft: "+", teeRight: "+", teeTop: "+", teeBottom: "+", cross: "+",
  };

  static box(content: string, style: BoxStyle = BoxDrawing.SINGLE, padding: number = 1): string {
    const lines = content.split("\n");
    const maxLen = Math.max(...lines.map((l) => l.length));
    const pad = " ".repeat(padding);
    const width = maxLen + padding * 2;

    const top = style.topLeft + style.horizontal.repeat(width) + style.topRight;
    const bottom = style.bottomLeft + style.horizontal.repeat(width) + style.bottomRight;
    const middle = lines.map((l) => style.vertical + pad + l.padEnd(maxLen) + pad + style.vertical);

    return [top, ...middle, bottom].join("\n");
  }

  static title(text: string, width: number, style: BoxStyle = BoxDrawing.SINGLE): string {
    const innerWidth = width - 2;
    const textLen = text.length;
    const leftPad = Math.floor((innerWidth - textLen) / 2);
    const rightPad = innerWidth - textLen - leftPad;
    return (
      style.topLeft +
      style.horizontal.repeat(leftPad) +
      text +
      style.horizontal.repeat(rightPad) +
      style.topRight
    );
  }

  static horizontalLine(width: number, style: BoxStyle = BoxDrawing.SINGLE): string {
    return style.horizontal.repeat(width);
  }

  static table(
    headers: string[],
    rows: string[][],
    style: BoxStyle = BoxDrawing.SINGLE,
  ): string {
    const colWidths = headers.map((h, i) => {
      const dataMax = Math.max(0, ...rows.map((r) => (r[i] || "").length));
      return Math.max(h.length, dataMax);
    });

    const hr = (left: string, mid: string, right: string) =>
      left + colWidths.map((w) => style.horizontal.repeat(w + 2)).join(mid) + right;

    const row = (cells: string[]) =>
      style.vertical +
      cells.map((c, i) => " " + (c || "").padEnd(colWidths[i]) + " ").join(style.vertical) +
      style.vertical;

    const lines: string[] = [];
    lines.push(hr(style.topLeft, style.teeBottom, style.topRight));
    lines.push(row(headers));
    lines.push(hr(style.teeRight, style.cross, style.teeLeft));
    for (const r of rows) lines.push(row(r));
    lines.push(hr(style.bottomLeft, style.teeTop, style.bottomRight));

    return lines.join("\n");
  }

  static grid(cellWidth: number, cellHeight: number, cols: number, gridRows: number, style: BoxStyle = BoxDrawing.SINGLE): string {
    const lines: string[] = [];
    for (let r = 0; r <= gridRows; r++) {
      if (r === 0) {
        lines.push(
          style.topLeft +
          Array(cols).fill(style.horizontal.repeat(cellWidth)).join(style.teeBottom) +
          style.topRight,
        );
      } else {
        lines.push(
          style.teeRight +
          Array(cols).fill(style.horizontal.repeat(cellWidth)).join(style.cross) +
          style.teeLeft,
        );
      }
      if (r < gridRows) {
        for (let h = 0; h < cellHeight; h++) {
          lines.push(
            style.vertical +
            Array(cols).fill(" ".repeat(cellWidth)).join(style.vertical) +
            style.vertical,
          );
        }
      }
    }
    lines.push(
      style.bottomLeft +
      Array(cols).fill(style.horizontal.repeat(cellWidth)).join(style.teeTop) +
      style.bottomRight,
    );
    return lines.join("\n");
  }
}
