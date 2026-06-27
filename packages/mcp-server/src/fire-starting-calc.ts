export type FireMethod = "bow_drill" | "ferro_rod" | "flint_steel" | "fire_piston" | "magnifying";

export function difficultyRating(method: FireMethod): number {
  const d: Record<FireMethod, number> = {
    bow_drill: 9, ferro_rod: 4, flint_steel: 6, fire_piston: 7, magnifying: 3,
  };
  return d[method];
}

export function sparkTemp(method: FireMethod): number {
  const s: Record<FireMethod, number> = {
    bow_drill: 400, ferro_rod: 3000, flint_steel: 800, fire_piston: 260, magnifying: 500,
  };
  return s[method];
}

export function wetConditionReliability(method: FireMethod): number {
  const w: Record<FireMethod, number> = {
    bow_drill: 2, ferro_rod: 9, flint_steel: 7, fire_piston: 5, magnifying: 1,
  };
  return w[method];
}

export function usesRequired(method: FireMethod): number {
  const u: Record<FireMethod, number> = {
    bow_drill: 1, ferro_rod: 20000, flint_steel: 3000, fire_piston: 5000, magnifying: 0,
  };
  return u[method];
}

export function sunRequired(method: FireMethod): boolean {
  const s: Record<FireMethod, boolean> = {
    bow_drill: false, ferro_rod: false, flint_steel: false, fire_piston: false, magnifying: true,
  };
  return s[method];
}

export function portability(method: FireMethod): number {
  const p: Record<FireMethod, number> = {
    bow_drill: 3, ferro_rod: 10, flint_steel: 9, fire_piston: 7, magnifying: 8,
  };
  return p[method];
}

export function bestTinder(method: FireMethod): string {
  const b: Record<FireMethod, string> = {
    bow_drill: "cedar_bark", ferro_rod: "cotton_ball", flint_steel: "char_cloth",
    fire_piston: "tinder_fungus", magnifying: "dry_leaves",
  };
  return b[method];
}

export function traditionalOrigin(method: FireMethod): string {
  const t: Record<FireMethod, string> = {
    bow_drill: "worldwide", ferro_rod: "modern", flint_steel: "europe",
    fire_piston: "southeast_asia", magnifying: "ancient_greece",
  };
  return t[method];
}

export function costEstimate(method: FireMethod): number {
  const c: Record<FireMethod, number> = {
    bow_drill: 0, ferro_rod: 15, flint_steel: 25, fire_piston: 40, magnifying: 10,
  };
  return c[method];
}

export function fireMethods(): FireMethod[] {
  return ["bow_drill", "ferro_rod", "flint_steel", "fire_piston", "magnifying"];
}
