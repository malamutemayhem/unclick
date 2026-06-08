export interface LSystemConfig {
  axiom: string;
  rules: Record<string, string>;
  iterations: number;
}

export interface TurtleState {
  x: number;
  y: number;
  angle: number;
}

export interface TurtleLine {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function produce(config: LSystemConfig): string {
  let current = config.axiom;
  for (let i = 0; i < config.iterations; i++) {
    let next = "";
    for (const ch of current) {
      next += config.rules[ch] ?? ch;
    }
    current = next;
  }
  return current;
}

export function produceStochastic(
  axiom: string,
  rules: Record<string, { replacement: string; weight: number }[]>,
  iterations: number,
): string {
  let current = axiom;
  for (let i = 0; i < iterations; i++) {
    let next = "";
    for (const ch of current) {
      const options = rules[ch];
      if (!options) {
        next += ch;
        continue;
      }
      let total = 0;
      for (const opt of options) total += opt.weight;
      let r = Math.random() * total;
      let chosen = options[0].replacement;
      for (const opt of options) {
        r -= opt.weight;
        if (r <= 0) {
          chosen = opt.replacement;
          break;
        }
      }
      next += chosen;
    }
    current = next;
  }
  return current;
}

export function interpret(
  str: string,
  stepLength: number,
  angleIncrement: number,
  startAngle = -90,
): { lines: TurtleLine[]; bounds: { minX: number; minY: number; maxX: number; maxY: number } } {
  const lines: TurtleLine[] = [];
  let x = 0;
  let y = 0;
  let angle = startAngle;
  const stack: TurtleState[] = [];

  let minX = 0;
  let minY = 0;
  let maxX = 0;
  let maxY = 0;

  for (const ch of str) {
    switch (ch) {
      case "F":
      case "G": {
        const rad = (angle * Math.PI) / 180;
        const nx = x + stepLength * Math.cos(rad);
        const ny = y + stepLength * Math.sin(rad);
        if (ch === "F") {
          lines.push({ x1: x, y1: y, x2: nx, y2: ny });
        }
        x = nx;
        y = ny;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        break;
      }
      case "+":
        angle += angleIncrement;
        break;
      case "-":
        angle -= angleIncrement;
        break;
      case "[":
        stack.push({ x, y, angle });
        break;
      case "]": {
        const state = stack.pop();
        if (state) {
          x = state.x;
          y = state.y;
          angle = state.angle;
        }
        break;
      }
    }
  }

  return { lines, bounds: { minX, minY, maxX, maxY } };
}

export const presets = {
  kochCurve: {
    axiom: "F",
    rules: { F: "F+F-F-F+F" },
    iterations: 3,
  },
  sierpinskiTriangle: {
    axiom: "F-G-G",
    rules: { F: "F-G+F+G-F", G: "GG" },
    iterations: 4,
  },
  dragonCurve: {
    axiom: "FX",
    rules: { X: "X+YF+", Y: "-FX-Y" },
    iterations: 8,
  },
  fractalPlant: {
    axiom: "X",
    rules: { X: "F+[[X]-X]-F[-FX]+X", F: "FF" },
    iterations: 4,
  },
} as const satisfies Record<string, LSystemConfig>;
