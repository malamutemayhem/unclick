export type ArrowShaft = "carbon" | "aluminum" | "wood" | "fiberglass" | "bamboo";

export function stiffnessSpine(a: ArrowShaft): number {
  const m: Record<ArrowShaft, number> = {
    carbon: 9, aluminum: 7, wood: 5, fiberglass: 6, bamboo: 4,
  };
  return m[a];
}

export function weightConsistency(a: ArrowShaft): number {
  const m: Record<ArrowShaft, number> = {
    carbon: 10, aluminum: 9, wood: 4, fiberglass: 7, bamboo: 3,
  };
  return m[a];
}

export function durability(a: ArrowShaft): number {
  const m: Record<ArrowShaft, number> = {
    carbon: 8, aluminum: 6, wood: 4, fiberglass: 7, bamboo: 3,
  };
  return m[a];
}

export function costPerDozen(a: ArrowShaft): number {
  const m: Record<ArrowShaft, number> = {
    carbon: 8, aluminum: 5, wood: 3, fiberglass: 4, bamboo: 2,
  };
  return m[a];
}

export function speedRating(a: ArrowShaft): number {
  const m: Record<ArrowShaft, number> = {
    carbon: 10, aluminum: 7, wood: 5, fiberglass: 6, bamboo: 4,
  };
  return m[a];
}

export function naturalMaterial(a: ArrowShaft): boolean {
  const m: Record<ArrowShaft, boolean> = {
    carbon: false, aluminum: false, wood: true, fiberglass: false, bamboo: true,
  };
  return m[a];
}

export function competitionLegal(a: ArrowShaft): boolean {
  const m: Record<ArrowShaft, boolean> = {
    carbon: true, aluminum: true, wood: true, fiberglass: true, bamboo: true,
  };
  return m[a];
}

export function bestPairedBow(a: ArrowShaft): string {
  const m: Record<ArrowShaft, string> = {
    carbon: "compound_recurve", aluminum: "recurve_beginner",
    wood: "longbow_traditional", fiberglass: "youth_beginner",
    bamboo: "kyudo_traditional",
  };
  return m[a];
}

export function failureMode(a: ArrowShaft): string {
  const m: Record<ArrowShaft, string> = {
    carbon: "splinter_shatter", aluminum: "bend_dent",
    wood: "snap_split", fiberglass: "crack_delaminate",
    bamboo: "split_warp",
  };
  return m[a];
}

export function arrowShafts(): ArrowShaft[] {
  return ["carbon", "aluminum", "wood", "fiberglass", "bamboo"];
}
