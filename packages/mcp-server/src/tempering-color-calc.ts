export type SteelType = "carbon_1080" | "carbon_1095" | "w1" | "o1" | "5160";

export function austenitizingTempCelsius(steel: SteelType): number {
  const temps: Record<SteelType, number> = {
    carbon_1080: 800, carbon_1095: 790, w1: 790, o1: 800, "5160": 830,
  };
  return temps[steel];
}

export function quenchMedium(steel: SteelType): string {
  const media: Record<SteelType, string> = {
    carbon_1080: "water", carbon_1095: "water", w1: "water", o1: "oil", "5160": "oil",
  };
  return media[steel];
}

export function temperColorAtDeg(tempCelsius: number): string {
  if (tempCelsius < 200) return "no_color";
  if (tempCelsius < 220) return "pale_yellow";
  if (tempCelsius < 240) return "straw";
  if (tempCelsius < 260) return "gold";
  if (tempCelsius < 280) return "brown";
  if (tempCelsius < 300) return "purple";
  if (tempCelsius < 320) return "blue";
  return "grey";
}

export function temperTempForKnife(steel: SteelType): number {
  const temps: Record<SteelType, number> = {
    carbon_1080: 205, carbon_1095: 190, w1: 195, o1: 200, "5160": 220,
  };
  return temps[steel];
}

export function temperTempForSpring(steel: SteelType): number {
  const temps: Record<SteelType, number> = {
    carbon_1080: 290, carbon_1095: 280, w1: 285, o1: 260, "5160": 300,
  };
  return temps[steel];
}

export function soakTimeMinutes(thicknessMm: number): number {
  return Math.max(30, Math.round(thicknessMm * 5));
}

export function hardnessHrc(steel: SteelType): number {
  const hrc: Record<SteelType, number> = {
    carbon_1080: 60, carbon_1095: 62, w1: 64, o1: 62, "5160": 58,
  };
  return hrc[steel];
}

export function decarburizationRisk(steel: SteelType): number {
  const risk: Record<SteelType, number> = {
    carbon_1080: 3, carbon_1095: 4, w1: 4, o1: 2, "5160": 2,
  };
  return risk[steel];
}

export function costPerKg(steel: SteelType): number {
  const costs: Record<SteelType, number> = {
    carbon_1080: 8, carbon_1095: 10, w1: 12, o1: 15, "5160": 6,
  };
  return costs[steel];
}

export function steelTypes(): SteelType[] {
  return ["carbon_1080", "carbon_1095", "w1", "o1", "5160"];
}
