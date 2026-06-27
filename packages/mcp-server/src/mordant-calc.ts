export type MordantType = "alum" | "iron" | "copper" | "tin" | "chrome";

export function mordantWeightG(fabricWeightKg: number, type: MordantType): number {
  const ratio: Record<MordantType, number> = {
    alum: 150, iron: 20, copper: 30, tin: 50, chrome: 25,
  };
  return parseFloat((fabricWeightKg * ratio[type]).toFixed(1));
}

export function soakTimeHours(type: MordantType): number {
  const hours: Record<MordantType, number> = {
    alum: 12, iron: 1, copper: 2, tin: 1, chrome: 4,
  };
  return hours[type];
}

export function temperatureCelsius(type: MordantType): number {
  const temps: Record<MordantType, number> = {
    alum: 80, iron: 60, copper: 70, tin: 85, chrome: 90,
  };
  return temps[type];
}

export function colorShiftEffect(type: MordantType): string {
  const effects: Record<MordantType, string> = {
    alum: "brightens", iron: "saddens", copper: "greens", tin: "brightens_warm", chrome: "deepens",
  };
  return effects[type];
}

export function toxicityRating(type: MordantType): number {
  const ratings: Record<MordantType, number> = {
    alum: 1, iron: 2, copper: 4, tin: 3, chrome: 5,
  };
  return ratings[type];
}

export function fiberCompatibility(type: MordantType): string[] {
  const compat: Record<MordantType, string[]> = {
    alum: ["wool", "silk", "cotton"],
    iron: ["wool", "silk", "cotton"],
    copper: ["wool", "silk"],
    tin: ["wool"],
    chrome: ["wool"],
  };
  return compat[type];
}

export function bathReusable(type: MordantType): boolean {
  return type === "alum" || type === "iron";
}

export function waterLiters(fabricWeightKg: number): number {
  return Math.round(fabricWeightKg * 30);
}

export function costPerKg(type: MordantType): number {
  const costs: Record<MordantType, number> = {
    alum: 8, iron: 5, copper: 15, tin: 30, chrome: 25,
  };
  return costs[type];
}

export function mordantTypes(): MordantType[] {
  return ["alum", "iron", "copper", "tin", "chrome"];
}
