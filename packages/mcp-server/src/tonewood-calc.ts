export type Tonewood = "spruce" | "cedar" | "maple" | "rosewood" | "ebony";

export function densityKgPerM3(wood: Tonewood): number {
  const d: Record<Tonewood, number> = {
    spruce: 440, cedar: 380, maple: 660, rosewood: 850, ebony: 1050,
  };
  return d[wood];
}

export function speedOfSoundMPerS(wood: Tonewood): number {
  const s: Record<Tonewood, number> = {
    spruce: 5500, cedar: 4800, maple: 4600, rosewood: 3900, ebony: 3500,
  };
  return s[wood];
}

export function dampingCoefficient(wood: Tonewood): number {
  const d: Record<Tonewood, number> = {
    spruce: 0.008, cedar: 0.010, maple: 0.012, rosewood: 0.006, ebony: 0.005,
  };
  return d[wood];
}

export function stiffnessGpa(wood: Tonewood): number {
  const s: Record<Tonewood, number> = {
    spruce: 12, cedar: 8, maple: 11, rosewood: 13, ebony: 16,
  };
  return s[wood];
}

export function bestUse(wood: Tonewood): string {
  const u: Record<Tonewood, string> = {
    spruce: "soundboard", cedar: "classical_top", maple: "back_and_sides",
    rosewood: "back_and_sides", ebony: "fingerboard",
  };
  return u[wood];
}

export function seasoningYears(wood: Tonewood): number {
  const y: Record<Tonewood, number> = {
    spruce: 5, cedar: 3, maple: 4, rosewood: 6, ebony: 8,
  };
  return y[wood];
}

export function workability(wood: Tonewood): number {
  const w: Record<Tonewood, number> = {
    spruce: 8, cedar: 9, maple: 6, rosewood: 4, ebony: 3,
  };
  return w[wood];
}

export function sustainRating(wood: Tonewood): number {
  const s: Record<Tonewood, number> = {
    spruce: 8, cedar: 6, maple: 7, rosewood: 9, ebony: 10,
  };
  return s[wood];
}

export function costPerBoardFoot(wood: Tonewood): number {
  const c: Record<Tonewood, number> = {
    spruce: 15, cedar: 12, maple: 20, rosewood: 80, ebony: 120,
  };
  return c[wood];
}

export function tonewoods(): Tonewood[] {
  return ["spruce", "cedar", "maple", "rosewood", "ebony"];
}
