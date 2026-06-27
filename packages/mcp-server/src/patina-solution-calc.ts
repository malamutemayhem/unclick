export type PatinaSolutionType = "liver_sulfur_dark" | "ferric_nitrate_brown" | "ammonia_fume_blue" | "vinegar_salt_green" | "selenium_dioxide_gun";

export function colorDepth(t: PatinaSolutionType): number {
  const m: Record<PatinaSolutionType, number> = {
    liver_sulfur_dark: 10, ferric_nitrate_brown: 7, ammonia_fume_blue: 8, vinegar_salt_green: 6, selenium_dioxide_gun: 9,
  };
  return m[t];
}

export function colorRange(t: PatinaSolutionType): number {
  const m: Record<PatinaSolutionType, number> = {
    liver_sulfur_dark: 9, ferric_nitrate_brown: 5, ammonia_fume_blue: 7, vinegar_salt_green: 4, selenium_dioxide_gun: 6,
  };
  return m[t];
}

export function applicationEase(t: PatinaSolutionType): number {
  const m: Record<PatinaSolutionType, number> = {
    liver_sulfur_dark: 8, ferric_nitrate_brown: 7, ammonia_fume_blue: 4, vinegar_salt_green: 9, selenium_dioxide_gun: 6,
  };
  return m[t];
}

export function durability(t: PatinaSolutionType): number {
  const m: Record<PatinaSolutionType, number> = {
    liver_sulfur_dark: 7, ferric_nitrate_brown: 8, ammonia_fume_blue: 6, vinegar_salt_green: 5, selenium_dioxide_gun: 9,
  };
  return m[t];
}

export function solutionCost(t: PatinaSolutionType): number {
  const m: Record<PatinaSolutionType, number> = {
    liver_sulfur_dark: 2, ferric_nitrate_brown: 2, ammonia_fume_blue: 1, vinegar_salt_green: 1, selenium_dioxide_gun: 3,
  };
  return m[t];
}

export function needsHeat(t: PatinaSolutionType): boolean {
  const m: Record<PatinaSolutionType, boolean> = {
    liver_sulfur_dark: true, ferric_nitrate_brown: false, ammonia_fume_blue: false, vinegar_salt_green: false, selenium_dioxide_gun: false,
  };
  return m[t];
}

export function fumeProcess(t: PatinaSolutionType): boolean {
  const m: Record<PatinaSolutionType, boolean> = {
    liver_sulfur_dark: false, ferric_nitrate_brown: false, ammonia_fume_blue: true, vinegar_salt_green: false, selenium_dioxide_gun: false,
  };
  return m[t];
}

export function activeChemical(t: PatinaSolutionType): string {
  const m: Record<PatinaSolutionType, string> = {
    liver_sulfur_dark: "potassium_polysulfide",
    ferric_nitrate_brown: "iron_nitrate_solution",
    ammonia_fume_blue: "ammonia_vapor_sealed",
    vinegar_salt_green: "acetic_acid_chloride",
    selenium_dioxide_gun: "selenium_dioxide_acid",
  };
  return m[t];
}

export function bestMetal(t: PatinaSolutionType): string {
  const m: Record<PatinaSolutionType, string> = {
    liver_sulfur_dark: "sterling_silver_copper",
    ferric_nitrate_brown: "bronze_brass_warm",
    ammonia_fume_blue: "copper_sheet_blue",
    vinegar_salt_green: "copper_verdigris_green",
    selenium_dioxide_gun: "steel_iron_gunmetal",
  };
  return m[t];
}

export function patinaSolutions(): PatinaSolutionType[] {
  return ["liver_sulfur_dark", "ferric_nitrate_brown", "ammonia_fume_blue", "vinegar_salt_green", "selenium_dioxide_gun"];
}
