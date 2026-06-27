export type CardScraperType = "rectangular_flat_standard" | "gooseneck_curved_profile" | "french_curve_set" | "cabinet_body_handle" | "micro_detail_small";

export function surfaceFinish(t: CardScraperType): number {
  const m: Record<CardScraperType, number> = {
    rectangular_flat_standard: 9, gooseneck_curved_profile: 7, french_curve_set: 8, cabinet_body_handle: 10, micro_detail_small: 8,
  };
  return m[t];
}

export function curveCapability(t: CardScraperType): number {
  const m: Record<CardScraperType, number> = {
    rectangular_flat_standard: 3, gooseneck_curved_profile: 10, french_curve_set: 9, cabinet_body_handle: 4, micro_detail_small: 7,
  };
  return m[t];
}

export function heatComfort(t: CardScraperType): number {
  const m: Record<CardScraperType, number> = {
    rectangular_flat_standard: 5, gooseneck_curved_profile: 6, french_curve_set: 6, cabinet_body_handle: 10, micro_detail_small: 7,
  };
  return m[t];
}

export function shavingControl(t: CardScraperType): number {
  const m: Record<CardScraperType, number> = {
    rectangular_flat_standard: 8, gooseneck_curved_profile: 7, french_curve_set: 7, cabinet_body_handle: 10, micro_detail_small: 9,
  };
  return m[t];
}

export function scraperCost(t: CardScraperType): number {
  const m: Record<CardScraperType, number> = {
    rectangular_flat_standard: 1, gooseneck_curved_profile: 1, french_curve_set: 2, cabinet_body_handle: 3, micro_detail_small: 1,
  };
  return m[t];
}

export function hasHandle(t: CardScraperType): boolean {
  const m: Record<CardScraperType, boolean> = {
    rectangular_flat_standard: false, gooseneck_curved_profile: false, french_curve_set: false, cabinet_body_handle: true, micro_detail_small: false,
  };
  return m[t];
}

export function forFlat(t: CardScraperType): boolean {
  const m: Record<CardScraperType, boolean> = {
    rectangular_flat_standard: true, gooseneck_curved_profile: false, french_curve_set: false, cabinet_body_handle: true, micro_detail_small: true,
  };
  return m[t];
}

export function steelGauge(t: CardScraperType): string {
  const m: Record<CardScraperType, string> = {
    rectangular_flat_standard: "blue_spring_steel_0_6mm",
    gooseneck_curved_profile: "blue_spring_steel_0_6mm",
    french_curve_set: "carbon_steel_0_5mm",
    cabinet_body_handle: "thick_carbon_1_0mm",
    micro_detail_small: "thin_spring_0_4mm",
  };
  return m[t];
}

export function bestSurface(t: CardScraperType): string {
  const m: Record<CardScraperType, string> = {
    rectangular_flat_standard: "tabletop_flat_finish",
    gooseneck_curved_profile: "molding_profile_clean",
    french_curve_set: "chair_spindle_smooth",
    cabinet_body_handle: "large_panel_scrape",
    micro_detail_small: "inlay_detail_flush",
  };
  return m[t];
}

export function cardScrapers(): CardScraperType[] {
  return ["rectangular_flat_standard", "gooseneck_curved_profile", "french_curve_set", "cabinet_body_handle", "micro_detail_small"];
}
