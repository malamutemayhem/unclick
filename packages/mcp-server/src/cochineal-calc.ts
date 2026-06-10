export type MordantType = "alum" | "tin" | "iron" | "copper" | "chrome";

export function insectsPerKgDye(): number {
  return 70000;
}

export function dyeConcentrationGPerLiter(mordant: MordantType): number {
  const conc: Record<MordantType, number> = {
    alum: 10, tin: 8, iron: 12, copper: 10, chrome: 8,
  };
  return conc[mordant];
}

export function colorResult(mordant: MordantType): string {
  const colors: Record<MordantType, string> = {
    alum: "crimson", tin: "scarlet", iron: "purple", copper: "burgundy", chrome: "orange_red",
  };
  return colors[mordant];
}

export function dyeTimeMinutes(mordant: MordantType): number {
  const times: Record<MordantType, number> = {
    alum: 60, tin: 45, iron: 90, copper: 75, chrome: 60,
  };
  return times[mordant];
}

export function dyeTempCelsius(): number {
  return 80;
}

export function lightFastnessRating(mordant: MordantType): number {
  const ratings: Record<MordantType, number> = {
    alum: 4, tin: 3, iron: 5, copper: 4, chrome: 5,
  };
  return ratings[mordant];
}

export function washFastnessRating(mordant: MordantType): number {
  const ratings: Record<MordantType, number> = {
    alum: 4, tin: 3, iron: 4, copper: 4, chrome: 5,
  };
  return ratings[mordant];
}

export function toxicityRating(mordant: MordantType): number {
  const ratings: Record<MordantType, number> = {
    alum: 1, tin: 3, iron: 1, copper: 2, chrome: 5,
  };
  return ratings[mordant];
}

export function costPerGram(mordant: MordantType): number {
  const costs: Record<MordantType, number> = {
    alum: 0.05, tin: 0.15, iron: 0.03, copper: 0.08, chrome: 0.2,
  };
  return costs[mordant];
}

export function mordantTypes(): MordantType[] {
  return ["alum", "tin", "iron", "copper", "chrome"];
}
