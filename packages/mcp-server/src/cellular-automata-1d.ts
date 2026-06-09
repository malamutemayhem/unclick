export interface CA1DState {
  cells: boolean[];
  rule: number;
  generation: number;
}

export function createState(width: number, rule: number): CA1DState {
  const cells = new Array(width).fill(false);
  cells[Math.floor(width / 2)] = true;
  return { cells, rule, generation: 0 };
}

export function createFromPattern(pattern: boolean[], rule: number): CA1DState {
  return { cells: [...pattern], rule, generation: 0 };
}

export function createRandom(width: number, rule: number, density = 0.5, seed = 42): CA1DState {
  let state = seed;
  const rand = () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
  const cells = Array.from({ length: width }, () => rand() < density);
  return { cells, rule, generation: 0 };
}

export function step(state: CA1DState): CA1DState {
  const w = state.cells.length;
  const next: boolean[] = new Array(w);

  for (let i = 0; i < w; i++) {
    const left = state.cells[(i - 1 + w) % w] ? 1 : 0;
    const center = state.cells[i] ? 1 : 0;
    const right = state.cells[(i + 1) % w] ? 1 : 0;
    const neighborhood = (left << 2) | (center << 1) | right;
    next[i] = ((state.rule >> neighborhood) & 1) === 1;
  }

  return { cells: next, rule: state.rule, generation: state.generation + 1 };
}

export function run(state: CA1DState, generations: number): CA1DState[] {
  const history: CA1DState[] = [state];
  let current = state;
  for (let i = 0; i < generations; i++) {
    current = step(current);
    history.push(current);
  }
  return history;
}

export function toAscii(state: CA1DState, on = "#", off = "."): string {
  return state.cells.map(c => c ? on : off).join("");
}

export function historyToAscii(history: CA1DState[], on = "#", off = "."): string {
  return history.map(s => toAscii(s, on, off)).join("\n");
}

export function countAlive(state: CA1DState): number {
  return state.cells.filter(c => c).length;
}

export function density(state: CA1DState): number {
  return countAlive(state) / state.cells.length;
}

export function isStatic(a: CA1DState, b: CA1DState): boolean {
  return a.cells.every((c, i) => c === b.cells[i]);
}

export function entropy(state: CA1DState): number {
  const n = state.cells.length;
  const ones = countAlive(state);
  const zeros = n - ones;
  if (ones === 0 || zeros === 0) return 0;

  const p1 = ones / n;
  const p0 = zeros / n;
  return -(p1 * Math.log2(p1) + p0 * Math.log2(p0));
}

export const NOTABLE_RULES = {
  rule30: 30,
  rule90: 90,
  rule110: 110,
  rule184: 184,
  rule150: 150,
};
