export type ThrowBlanketType = "chunky_knit_chenille" | "fleece_plush_soft" | "cotton_waffle_weave" | "weighted_anxiety_calm" | "electric_heated_warm";

export function coziness(t: ThrowBlanketType): number {
  const m: Record<ThrowBlanketType, number> = {
    chunky_knit_chenille: 9, fleece_plush_soft: 10, cotton_waffle_weave: 6, weighted_anxiety_calm: 8, electric_heated_warm: 9,
  };
  return m[t];
}

export function breathability(t: ThrowBlanketType): number {
  const m: Record<ThrowBlanketType, number> = {
    chunky_knit_chenille: 7, fleece_plush_soft: 4, cotton_waffle_weave: 10, weighted_anxiety_calm: 3, electric_heated_warm: 5,
  };
  return m[t];
}

export function decorStyle(t: ThrowBlanketType): number {
  const m: Record<ThrowBlanketType, number> = {
    chunky_knit_chenille: 10, fleece_plush_soft: 5, cotton_waffle_weave: 8, weighted_anxiety_calm: 4, electric_heated_warm: 3,
  };
  return m[t];
}

export function versatility(t: ThrowBlanketType): number {
  const m: Record<ThrowBlanketType, number> = {
    chunky_knit_chenille: 6, fleece_plush_soft: 8, cotton_waffle_weave: 10, weighted_anxiety_calm: 4, electric_heated_warm: 5,
  };
  return m[t];
}

export function throwCost(t: ThrowBlanketType): number {
  const m: Record<ThrowBlanketType, number> = {
    chunky_knit_chenille: 6, fleece_plush_soft: 3, cotton_waffle_weave: 5, weighted_anxiety_calm: 7, electric_heated_warm: 6,
  };
  return m[t];
}

export function machineWash(t: ThrowBlanketType): boolean {
  const m: Record<ThrowBlanketType, boolean> = {
    chunky_knit_chenille: true, fleece_plush_soft: true, cotton_waffle_weave: true, weighted_anxiety_calm: true, electric_heated_warm: false,
  };
  return m[t];
}

export function needsPower(t: ThrowBlanketType): boolean {
  const m: Record<ThrowBlanketType, boolean> = {
    chunky_knit_chenille: false, fleece_plush_soft: false, cotton_waffle_weave: false, weighted_anxiety_calm: false, electric_heated_warm: true,
  };
  return m[t];
}

export function fabricType(t: ThrowBlanketType): string {
  const m: Record<ThrowBlanketType, string> = {
    chunky_knit_chenille: "chenille_hand_knit_bulky",
    fleece_plush_soft: "double_sided_sherpa_fleece",
    cotton_waffle_weave: "cotton_honeycomb_waffle",
    weighted_anxiety_calm: "glass_bead_mink_cover",
    electric_heated_warm: "micro_plush_heating_wire",
  };
  return m[t];
}

export function bestUse(t: ThrowBlanketType): string {
  const m: Record<ThrowBlanketType, string> = {
    chunky_knit_chenille: "sofa_decor_photo_prop",
    fleece_plush_soft: "movie_night_couch_cuddle",
    cotton_waffle_weave: "year_round_bed_layer",
    weighted_anxiety_calm: "sleep_anxiety_deep_press",
    electric_heated_warm: "cold_office_winter_warm",
  };
  return m[t];
}

export function throwBlankets(): ThrowBlanketType[] {
  return ["chunky_knit_chenille", "fleece_plush_soft", "cotton_waffle_weave", "weighted_anxiety_calm", "electric_heated_warm"];
}
