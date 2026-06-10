export type CrochetStitch = "chain" | "single" | "double" | "treble" | "shell";

export function height(stitch: CrochetStitch): number {
  const m: Record<CrochetStitch, number> = {
    chain: 1, single: 2, double: 4, treble: 6, shell: 4,
  };
  return m[stitch];
}

export function yarnConsumption(stitch: CrochetStitch): number {
  const m: Record<CrochetStitch, number> = {
    chain: 1, single: 5, double: 7, treble: 9, shell: 8,
  };
  return m[stitch];
}

export function drapeFactor(stitch: CrochetStitch): number {
  const m: Record<CrochetStitch, number> = {
    chain: 10, single: 3, double: 6, treble: 8, shell: 7,
  };
  return m[stitch];
}

export function speedRating(stitch: CrochetStitch): number {
  const m: Record<CrochetStitch, number> = {
    chain: 10, single: 4, double: 7, treble: 8, shell: 5,
  };
  return m[stitch];
}

export function warmth(stitch: CrochetStitch): number {
  const m: Record<CrochetStitch, number> = {
    chain: 0, single: 10, double: 7, treble: 5, shell: 6,
  };
  return m[stitch];
}

export function structural(stitch: CrochetStitch): boolean {
  const m: Record<CrochetStitch, boolean> = {
    chain: false, single: true, double: false, treble: false, shell: false,
  };
  return m[stitch];
}

export function lacyAppearance(stitch: CrochetStitch): boolean {
  const m: Record<CrochetStitch, boolean> = {
    chain: false, single: false, double: false, treble: true, shell: true,
  };
  return m[stitch];
}

export function bestProject(stitch: CrochetStitch): string {
  const m: Record<CrochetStitch, string> = {
    chain: "foundation", single: "amigurumi", double: "blanket",
    treble: "shawl", shell: "doily",
  };
  return m[stitch];
}

export function beginnerFriendly(stitch: CrochetStitch): number {
  const m: Record<CrochetStitch, number> = {
    chain: 10, single: 9, double: 7, treble: 5, shell: 4,
  };
  return m[stitch];
}

export function crochetStitches(): CrochetStitch[] {
  return ["chain", "single", "double", "treble", "shell"];
}
