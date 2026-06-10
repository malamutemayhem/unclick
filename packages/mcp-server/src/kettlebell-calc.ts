export type KettlebellType = "cast_iron_standard" | "competition_steel" | "adjustable_dial" | "vinyl_coated" | "powder_coat_premium";

export function swingControl(t: KettlebellType): number {
  const m: Record<KettlebellType, number> = {
    cast_iron_standard: 8, competition_steel: 10, adjustable_dial: 6, vinyl_coated: 5, powder_coat_premium: 9,
  };
  return m[t];
}

export function gripComfort(t: KettlebellType): number {
  const m: Record<KettlebellType, number> = {
    cast_iron_standard: 7, competition_steel: 9, adjustable_dial: 6, vinyl_coated: 5, powder_coat_premium: 10,
  };
  return m[t];
}

export function weightRange(t: KettlebellType): number {
  const m: Record<KettlebellType, number> = {
    cast_iron_standard: 6, competition_steel: 7, adjustable_dial: 10, vinyl_coated: 4, powder_coat_premium: 6,
  };
  return m[t];
}

export function floorSafety(t: KettlebellType): number {
  const m: Record<KettlebellType, number> = {
    cast_iron_standard: 4, competition_steel: 5, adjustable_dial: 7, vinyl_coated: 10, powder_coat_premium: 6,
  };
  return m[t];
}

export function bellCost(t: KettlebellType): number {
  const m: Record<KettlebellType, number> = {
    cast_iron_standard: 3, competition_steel: 8, adjustable_dial: 9, vinyl_coated: 2, powder_coat_premium: 6,
  };
  return m[t];
}

export function uniformShape(t: KettlebellType): boolean {
  const m: Record<KettlebellType, boolean> = {
    cast_iron_standard: false, competition_steel: true, adjustable_dial: false, vinyl_coated: false, powder_coat_premium: false,
  };
  return m[t];
}

export function colorCoded(t: KettlebellType): boolean {
  const m: Record<KettlebellType, boolean> = {
    cast_iron_standard: false, competition_steel: true, adjustable_dial: false, vinyl_coated: true, powder_coat_premium: false,
  };
  return m[t];
}

export function handleFinish(t: KettlebellType): string {
  const m: Record<KettlebellType, string> = {
    cast_iron_standard: "raw_iron_smooth",
    competition_steel: "chrome_plated_33mm",
    adjustable_dial: "textured_plastic_grip",
    vinyl_coated: "vinyl_over_iron",
    powder_coat_premium: "powder_coat_textured",
  };
  return m[t];
}

export function bestTraining(t: KettlebellType): string {
  const m: Record<KettlebellType, string> = {
    cast_iron_standard: "general_home_gym",
    competition_steel: "sport_competition_girevoy",
    adjustable_dial: "space_saving_multi_weight",
    vinyl_coated: "beginner_group_class",
    powder_coat_premium: "crossfit_functional_training",
  };
  return m[t];
}

export function kettlebells(): KettlebellType[] {
  return ["cast_iron_standard", "competition_steel", "adjustable_dial", "vinyl_coated", "powder_coat_premium"];
}
