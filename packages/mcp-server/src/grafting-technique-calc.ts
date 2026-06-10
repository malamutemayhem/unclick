export type GraftType = "whip_tongue" | "cleft" | "bark" | "bud" | "bridge";

export function successRatePercent(graft: GraftType): number {
  const s: Record<GraftType, number> = {
    whip_tongue: 90, cleft: 80, bark: 75, bud: 85, bridge: 70,
  };
  return s[graft];
}

export function healingWeeks(graft: GraftType): number {
  const h: Record<GraftType, number> = {
    whip_tongue: 4, cleft: 6, bark: 8, bud: 3, bridge: 10,
  };
  return h[graft];
}

export function maxRootstockDiameterCm(graft: GraftType): number {
  const m: Record<GraftType, number> = {
    whip_tongue: 2, cleft: 10, bark: 15, bud: 3, bridge: 20,
  };
  return m[graft];
}

export function skillRequired(graft: GraftType): number {
  const s: Record<GraftType, number> = {
    whip_tongue: 7, cleft: 5, bark: 4, bud: 6, bridge: 8,
  };
  return s[graft];
}

export function bestSeason(graft: GraftType): string {
  const b: Record<GraftType, string> = {
    whip_tongue: "late_winter", cleft: "early_spring", bark: "spring",
    bud: "summer", bridge: "spring",
  };
  return b[graft];
}

export function toolsNeeded(graft: GraftType): number {
  const t: Record<GraftType, number> = {
    whip_tongue: 3, cleft: 2, bark: 2, bud: 2, bridge: 4,
  };
  return t[graft];
}

export function waxRequired(graft: GraftType): boolean {
  const w: Record<GraftType, boolean> = {
    whip_tongue: true, cleft: true, bark: true, bud: false, bridge: true,
  };
  return w[graft];
}

export function bestFruitTree(graft: GraftType): string {
  const b: Record<GraftType, string> = {
    whip_tongue: "apple", cleft: "cherry", bark: "pecan",
    bud: "peach", bridge: "damaged_trees",
  };
  return b[graft];
}

export function difficultyRating(graft: GraftType): number {
  const d: Record<GraftType, number> = {
    whip_tongue: 7, cleft: 4, bark: 3, bud: 5, bridge: 9,
  };
  return d[graft];
}

export function graftTypes(): GraftType[] {
  return ["whip_tongue", "cleft", "bark", "bud", "bridge"];
}
