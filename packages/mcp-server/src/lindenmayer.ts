export interface LSystemRule {
  predecessor: string;
  successor: string;
}

export interface LSystem {
  axiom: string;
  rules: LSystemRule[];
}

export function createLSystem(axiom: string, rules: Record<string, string>): LSystem {
  return {
    axiom,
    rules: Object.entries(rules).map(([predecessor, successor]) => ({
      predecessor, successor,
    })),
  };
}

export function iterate(system: LSystem, generations: number): string {
  let current = system.axiom;
  const ruleMap = new Map<string, string>();
  for (const r of system.rules) {
    ruleMap.set(r.predecessor, r.successor);
  }

  for (let g = 0; g < generations; g++) {
    let next = "";
    for (const ch of current) {
      next += ruleMap.get(ch) ?? ch;
    }
    current = next;
  }
  return current;
}

export interface TurtlePoint {
  x: number;
  y: number;
}

export interface LSystemLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function interpret(
  instructions: string,
  stepSize: number,
  angleDeg: number
): { lines: LSystemLine[]; points: TurtlePoint[] } {
  const lines: LSystemLine[] = [];
  const points: TurtlePoint[] = [{ x: 0, y: 0 }];
  let x = 0, y = 0, angle = -90;
  const stack: { x: number; y: number; angle: number }[] = [];
  const angleRad = () => (angle * Math.PI) / 180;

  for (const ch of instructions) {
    switch (ch) {
      case "F":
      case "G": {
        const nx = x + stepSize * Math.cos(angleRad());
        const ny = y + stepSize * Math.sin(angleRad());
        lines.push({ x1: x, y1: y, x2: nx, y2: ny });
        x = nx;
        y = ny;
        points.push({ x, y });
        break;
      }
      case "f": {
        x += stepSize * Math.cos(angleRad());
        y += stepSize * Math.sin(angleRad());
        points.push({ x, y });
        break;
      }
      case "+":
        angle += angleDeg;
        break;
      case "-":
        angle -= angleDeg;
        break;
      case "[":
        stack.push({ x, y, angle });
        break;
      case "]": {
        const s = stack.pop();
        if (s) { x = s.x; y = s.y; angle = s.angle; }
        break;
      }
    }
  }

  return { lines, points };
}

export function getBounds(lines: LSystemLine[]): {
  minX: number; minY: number; maxX: number; maxY: number;
} {
  if (lines.length === 0) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const l of lines) {
    minX = Math.min(minX, l.x1, l.x2);
    minY = Math.min(minY, l.y1, l.y2);
    maxX = Math.max(maxX, l.x1, l.x2);
    maxY = Math.max(maxY, l.y1, l.y2);
  }
  return { minX, minY, maxX, maxY };
}

export function toSVG(lines: LSystemLine[], padding = 10): string {
  const b = getBounds(lines);
  const w = Math.ceil(b.maxX - b.minX) + padding * 2;
  const h = Math.ceil(b.maxY - b.minY) + padding * 2;
  const ox = -b.minX + padding;
  const oy = -b.minY + padding;

  const paths = lines.map(l =>
    `<line x1="${(l.x1 + ox).toFixed(2)}" y1="${(l.y1 + oy).toFixed(2)}" x2="${(l.x2 + ox).toFixed(2)}" y2="${(l.y2 + oy).toFixed(2)}" stroke="black" stroke-width="1"/>`
  ).join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">\n  ${paths}\n</svg>`;
}

export const PRESETS = {
  kochCurve: createLSystem("F", { F: "F+F-F-F+F" }),
  sierpinskiTriangle: createLSystem("F-G-G", { F: "F-G+F+G-F", G: "GG" }),
  dragonCurve: createLSystem("FX", { X: "X+YF+", Y: "-FX-Y" }),
  plant: createLSystem("X", { X: "F+[[X]-X]-F[-FX]+X", F: "FF" }),
  hilbertCurve: createLSystem("A", { A: "-BF+AFA+FB-", B: "+AF-BFB-FA+" }),
};

export function characterFrequency(str: string): Map<string, number> {
  const freq = new Map<string, number>();
  for (const ch of str) {
    freq.set(ch, (freq.get(ch) ?? 0) + 1);
  }
  return freq;
}

export function stringLength(system: LSystem, generations: number): number {
  return iterate(system, generations).length;
}
