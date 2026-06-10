export type GraftType = "whip_tongue" | "cleft" | "bark" | "bud_chip" | "bridge";

export function successRatePercent(graft: GraftType): number {
  const r: Record<GraftType, number> = {
    whip_tongue: 90, cleft: 80, bark: 75, bud_chip: 85, bridge: 70,
  };
  return r[graft];
}

export function healingWeeks(graft: GraftType): number {
  const w: Record<GraftType, number> = {
    whip_tongue: 4, cleft: 6, bark: 8, bud_chip: 3, bridge: 10,
  };
  return w[graft];
}

export function scionSizeCmMin(graft: GraftType): number {
  const s: Record<GraftType, number> = {
    whip_tongue: 0.5, cleft: 1.0, bark: 2.0, bud_chip: 0.3, bridge: 0.5,
  };
  return s[graft];
}

export function bestSeason(graft: GraftType): string {
  const s: Record<GraftType, string> = {
    whip_tongue: "late_winter", cleft: "early_spring", bark: "spring",
    bud_chip: "summer", bridge: "spring",
  };
  return s[graft];
}

export function cambiumAlignmentCritical(graft: GraftType): number {
  const c: Record<GraftType, number> = {
    whip_tongue: 10, cleft: 7, bark: 6, bud_chip: 9, bridge: 8,
  };
  return c[graft];
}

export function wrappingRequired(graft: GraftType): boolean {
  return true;
}

export function knifeSkillLevel(graft: GraftType): number {
  const k: Record<GraftType, number> = {
    whip_tongue: 9, cleft: 5, bark: 4, bud_chip: 7, bridge: 6,
  };
  return k[graft];
}

export function multiScionCapable(graft: GraftType): boolean {
  return graft === "cleft" || graft === "bark";
}

export function costPerGraft(graft: GraftType): number {
  const c: Record<GraftType, number> = {
    whip_tongue: 3, cleft: 2, bark: 2, bud_chip: 1, bridge: 4,
  };
  return c[graft];
}

export function graftTypes(): GraftType[] {
  return ["whip_tongue", "cleft", "bark", "bud_chip", "bridge"];
}
