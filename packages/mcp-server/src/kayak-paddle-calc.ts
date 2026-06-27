export type KayakPaddleType = "aluminum_entry" | "fiberglass_touring" | "carbon_performance" | "wood_traditional" | "greenland_narrow";

export function paddleWeight(t: KayakPaddleType): number {
  const m: Record<KayakPaddleType, number> = {
    aluminum_entry: 8, fiberglass_touring: 5, carbon_performance: 2, wood_traditional: 6, greenland_narrow: 4,
  };
  return m[t];
}

export function strokeEfficiency(t: KayakPaddleType): number {
  const m: Record<KayakPaddleType, number> = {
    aluminum_entry: 4, fiberglass_touring: 7, carbon_performance: 10, wood_traditional: 6, greenland_narrow: 8,
  };
  return m[t];
}

export function durabilityScore(t: KayakPaddleType): number {
  const m: Record<KayakPaddleType, number> = {
    aluminum_entry: 9, fiberglass_touring: 7, carbon_performance: 5, wood_traditional: 6, greenland_narrow: 7,
  };
  return m[t];
}

export function bladeArea(t: KayakPaddleType): number {
  const m: Record<KayakPaddleType, number> = {
    aluminum_entry: 7, fiberglass_touring: 8, carbon_performance: 9, wood_traditional: 7, greenland_narrow: 4,
  };
  return m[t];
}

export function paddleCost(t: KayakPaddleType): number {
  const m: Record<KayakPaddleType, number> = {
    aluminum_entry: 1, fiberglass_touring: 5, carbon_performance: 10, wood_traditional: 7, greenland_narrow: 6,
  };
  return m[t];
}

export function feathered(t: KayakPaddleType): boolean {
  const m: Record<KayakPaddleType, boolean> = {
    aluminum_entry: true, fiberglass_touring: true, carbon_performance: true, wood_traditional: false, greenland_narrow: false,
  };
  return m[t];
}

export function twopiece(t: KayakPaddleType): boolean {
  const m: Record<KayakPaddleType, boolean> = {
    aluminum_entry: true, fiberglass_touring: true, carbon_performance: true, wood_traditional: false, greenland_narrow: false,
  };
  return m[t];
}

export function bladeMaterial(t: KayakPaddleType): string {
  const m: Record<KayakPaddleType, string> = {
    aluminum_entry: "injection_molded_nylon", fiberglass_touring: "fiberglass_layup",
    carbon_performance: "prepreg_carbon_fiber", wood_traditional: "laminated_hardwood",
    greenland_narrow: "western_red_cedar",
  };
  return m[t];
}

export function bestStyle(t: KayakPaddleType): string {
  const m: Record<KayakPaddleType, string> = {
    aluminum_entry: "casual_flatwater_rental", fiberglass_touring: "multi_day_expedition",
    carbon_performance: "racing_sprint_marathon", wood_traditional: "artisan_cruising_display",
    greenland_narrow: "rolling_technique_practice",
  };
  return m[t];
}

export function kayakPaddles(): KayakPaddleType[] {
  return ["aluminum_entry", "fiberglass_touring", "carbon_performance", "wood_traditional", "greenland_narrow"];
}
