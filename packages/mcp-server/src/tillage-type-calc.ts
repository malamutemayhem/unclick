export type TillageType = "moldboard" | "chisel" | "no_till" | "strip_till" | "rotary";

export function soilDisturbance(t: TillageType): number {
  const m: Record<TillageType, number> = {
    moldboard: 10, chisel: 7, no_till: 0, strip_till: 3, rotary: 8,
  };
  return m[t];
}

export function residueBurial(t: TillageType): number {
  const m: Record<TillageType, number> = {
    moldboard: 10, chisel: 5, no_till: 0, strip_till: 2, rotary: 7,
  };
  return m[t];
}

export function erosionRisk(t: TillageType): number {
  const m: Record<TillageType, number> = {
    moldboard: 9, chisel: 6, no_till: 1, strip_till: 3, rotary: 7,
  };
  return m[t];
}

export function fuelCostPerHectare(t: TillageType): number {
  const m: Record<TillageType, number> = {
    moldboard: 9, chisel: 6, no_till: 1, strip_till: 3, rotary: 7,
  };
  return m[t];
}

export function soilMoistureRetention(t: TillageType): number {
  const m: Record<TillageType, number> = {
    moldboard: 3, chisel: 5, no_till: 10, strip_till: 8, rotary: 4,
  };
  return m[t];
}

export function invertsSoil(t: TillageType): boolean {
  const m: Record<TillageType, boolean> = {
    moldboard: true, chisel: false, no_till: false, strip_till: false, rotary: false,
  };
  return m[t];
}

export function conservationPractice(t: TillageType): boolean {
  const m: Record<TillageType, boolean> = {
    moldboard: false, chisel: false, no_till: true, strip_till: true, rotary: false,
  };
  return m[t];
}

export function bestSoilType(t: TillageType): string {
  const m: Record<TillageType, string> = {
    moldboard: "heavy_clay", chisel: "compacted", no_till: "well_structured",
    strip_till: "row_crops", rotary: "garden_beds",
  };
  return m[t];
}

export function depthCm(t: TillageType): number {
  const m: Record<TillageType, number> = {
    moldboard: 25, chisel: 30, no_till: 0, strip_till: 15, rotary: 15,
  };
  return m[t];
}

export function tillageTypes(): TillageType[] {
  return ["moldboard", "chisel", "no_till", "strip_till", "rotary"];
}
