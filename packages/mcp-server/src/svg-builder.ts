export interface SVGAttrs {
  [key: string]: string | number;
}

function attrsToString(attrs: SVGAttrs): string {
  return Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
}

export class SVGElement {
  readonly tag: string;
  readonly attrs: SVGAttrs;
  readonly children: SVGElement[];
  readonly text: string;

  constructor(tag: string, attrs: SVGAttrs = {}, children: SVGElement[] = [], text = "") {
    this.tag = tag;
    this.attrs = attrs;
    this.children = children;
    this.text = text;
  }

  render(indent = 0): string {
    const pad = "  ".repeat(indent);
    const attrStr = Object.keys(this.attrs).length > 0 ? " " + attrsToString(this.attrs) : "";

    if (this.children.length === 0 && !this.text) {
      return `${pad}<${this.tag}${attrStr}/>`;
    }

    const lines: string[] = [];
    lines.push(`${pad}<${this.tag}${attrStr}>`);
    if (this.text) lines.push(`${pad}  ${this.text}`);
    for (const child of this.children) {
      lines.push(child.render(indent + 1));
    }
    lines.push(`${pad}</${this.tag}>`);
    return lines.join("\n");
  }
}

export class SVGBuilder {
  private width: number;
  private height: number;
  private elements: SVGElement[] = [];
  private defs: SVGElement[] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  rect(x: number, y: number, w: number, h: number, attrs: SVGAttrs = {}): this {
    this.elements.push(new SVGElement("rect", { x, y, width: w, height: h, ...attrs }));
    return this;
  }

  circle(cx: number, cy: number, r: number, attrs: SVGAttrs = {}): this {
    this.elements.push(new SVGElement("circle", { cx, cy, r, ...attrs }));
    return this;
  }

  ellipse(cx: number, cy: number, rx: number, ry: number, attrs: SVGAttrs = {}): this {
    this.elements.push(new SVGElement("ellipse", { cx, cy, rx, ry, ...attrs }));
    return this;
  }

  line(x1: number, y1: number, x2: number, y2: number, attrs: SVGAttrs = {}): this {
    this.elements.push(new SVGElement("line", { x1, y1, x2, y2, stroke: "black", ...attrs }));
    return this;
  }

  polyline(points: [number, number][], attrs: SVGAttrs = {}): this {
    const pointsStr = points.map(([x, y]) => `${x},${y}`).join(" ");
    this.elements.push(new SVGElement("polyline", { points: pointsStr, fill: "none", stroke: "black", ...attrs }));
    return this;
  }

  polygon(points: [number, number][], attrs: SVGAttrs = {}): this {
    const pointsStr = points.map(([x, y]) => `${x},${y}`).join(" ");
    this.elements.push(new SVGElement("polygon", { points: pointsStr, ...attrs }));
    return this;
  }

  path(d: string, attrs: SVGAttrs = {}): this {
    this.elements.push(new SVGElement("path", { d, fill: "none", stroke: "black", ...attrs }));
    return this;
  }

  text(x: number, y: number, content: string, attrs: SVGAttrs = {}): this {
    this.elements.push(new SVGElement("text", { x, y, ...attrs }, [], content));
    return this;
  }

  group(attrs: SVGAttrs, children: SVGElement[]): this {
    this.elements.push(new SVGElement("g", attrs, children));
    return this;
  }

  addDef(element: SVGElement): this {
    this.defs.push(element);
    return this;
  }

  build(): string {
    const children = [...this.elements];
    if (this.defs.length > 0) {
      children.unshift(new SVGElement("defs", {}, this.defs));
    }
    const svg = new SVGElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: this.width,
      height: this.height,
      viewBox: `0 0 ${this.width} ${this.height}`,
    }, children);
    return svg.render();
  }

  get elementCount(): number {
    return this.elements.length;
  }
}

export function createBarChart(data: { label: string; value: number }[], width = 400, height = 300): string {
  const svg = new SVGBuilder(width, height);
  const maxVal = Math.max(...data.map(d => d.value));
  const barWidth = (width - 60) / data.length;
  const chartHeight = height - 40;

  for (let i = 0; i < data.length; i++) {
    const barHeight = (data[i].value / maxVal) * chartHeight;
    svg.rect(30 + i * barWidth + 2, height - 20 - barHeight, barWidth - 4, barHeight, { fill: "#4CAF50" });
    svg.text(30 + i * barWidth + barWidth / 2, height - 5, data[i].label, { "text-anchor": "middle", "font-size": 10 });
  }

  return svg.build();
}
