export type EmbroideryStabilizerType = "tear_away_light" | "cut_away_permanent" | "wash_away_dissolve" | "heat_away_vanish" | "sticky_back_adhesive";

export function holdStrength(t: EmbroideryStabilizerType): number {
  const m: Record<EmbroideryStabilizerType, number> = {
    tear_away_light: 6, cut_away_permanent: 10, wash_away_dissolve: 5, heat_away_vanish: 4, sticky_back_adhesive: 8,
  };
  return m[t];
}

export function removalEase(t: EmbroideryStabilizerType): number {
  const m: Record<EmbroideryStabilizerType, number> = {
    tear_away_light: 9, cut_away_permanent: 4, wash_away_dissolve: 10, heat_away_vanish: 8, sticky_back_adhesive: 6,
  };
  return m[t];
}

export function fabricSafe(t: EmbroideryStabilizerType): number {
  const m: Record<EmbroideryStabilizerType, number> = {
    tear_away_light: 8, cut_away_permanent: 7, wash_away_dissolve: 10, heat_away_vanish: 6, sticky_back_adhesive: 7,
  };
  return m[t];
}

export function versatility(t: EmbroideryStabilizerType): number {
  const m: Record<EmbroideryStabilizerType, number> = {
    tear_away_light: 8, cut_away_permanent: 7, wash_away_dissolve: 6, heat_away_vanish: 5, sticky_back_adhesive: 9,
  };
  return m[t];
}

export function stabilizerCost(t: EmbroideryStabilizerType): number {
  const m: Record<EmbroideryStabilizerType, number> = {
    tear_away_light: 1, cut_away_permanent: 1, wash_away_dissolve: 2, heat_away_vanish: 3, sticky_back_adhesive: 2,
  };
  return m[t];
}

export function fullRemoval(t: EmbroideryStabilizerType): boolean {
  const m: Record<EmbroideryStabilizerType, boolean> = {
    tear_away_light: false, cut_away_permanent: false, wash_away_dissolve: true, heat_away_vanish: true, sticky_back_adhesive: false,
  };
  return m[t];
}

export function noHoopNeeded(t: EmbroideryStabilizerType): boolean {
  const m: Record<EmbroideryStabilizerType, boolean> = {
    tear_away_light: false, cut_away_permanent: false, wash_away_dissolve: false, heat_away_vanish: false, sticky_back_adhesive: true,
  };
  return m[t];
}

export function removalMethod(t: EmbroideryStabilizerType): string {
  const m: Record<EmbroideryStabilizerType, string> = {
    tear_away_light: "perforated_tear_edge",
    cut_away_permanent: "trim_close_stitch",
    wash_away_dissolve: "water_dissolve_rinse",
    heat_away_vanish: "iron_heat_evaporate",
    sticky_back_adhesive: "peel_adhesive_back",
  };
  return m[t];
}

export function bestFabric(t: EmbroideryStabilizerType): string {
  const m: Record<EmbroideryStabilizerType, string> = {
    tear_away_light: "woven_cotton_stable",
    cut_away_permanent: "knit_stretch_jersey",
    wash_away_dissolve: "sheer_organza_tulle",
    heat_away_vanish: "velvet_nap_delicate",
    sticky_back_adhesive: "small_piece_no_hoop",
  };
  return m[t];
}

export function embroideryStabilizers(): EmbroideryStabilizerType[] {
  return ["tear_away_light", "cut_away_permanent", "wash_away_dissolve", "heat_away_vanish", "sticky_back_adhesive"];
}
