export type PlateType = "copper" | "zinc" | "steel" | "aluminum" | "brass";

export function plateThicknessMm(type: PlateType): number {
  const thicknesses: Record<PlateType, number> = {
    copper: 1.6, zinc: 1.2, steel: 1.0, aluminum: 0.8, brass: 1.5,
  };
  return thicknesses[type];
}

export function burinAngleDeg(technique: "line" | "stipple" | "mezzotint"): number {
  const angles: Record<string, number> = { line: 45, stipple: 60, mezzotint: 30 };
  return angles[technique];
}

export function lineDepthMm(technique: "line" | "stipple" | "mezzotint"): number {
  const depths: Record<string, number> = { line: 0.15, stipple: 0.08, mezzotint: 0.2 };
  return depths[technique];
}

export function inkViscosity(type: PlateType): number {
  const visc: Record<PlateType, number> = {
    copper: 8, zinc: 6, steel: 9, aluminum: 5, brass: 7,
  };
  return visc[type];
}

export function wipingPassCount(technique: "line" | "stipple" | "mezzotint"): number {
  const passes: Record<string, number> = { line: 3, stipple: 4, mezzotint: 6 };
  return passes[technique];
}

export function pressureTonnes(plateSizeCm2: number): number {
  return parseFloat((plateSizeCm2 * 0.003 + 0.5).toFixed(2));
}

export function dampPaperSoakMinutes(paperWeight: "light" | "medium" | "heavy"): number {
  const mins: Record<string, number> = { light: 5, medium: 10, heavy: 20 };
  return mins[paperWeight];
}

export function impressionsPerPlate(type: PlateType): number {
  const counts: Record<PlateType, number> = {
    copper: 500, zinc: 200, steel: 10000, aluminum: 100, brass: 800,
  };
  return counts[type];
}

export function etchTimeMinutes(type: PlateType): number {
  const times: Record<PlateType, number> = {
    copper: 30, zinc: 15, steel: 45, aluminum: 10, brass: 25,
  };
  return times[type];
}

export function costPerPlate(type: PlateType, baseCost: number): number {
  const mult: Record<PlateType, number> = {
    copper: 3.0, zinc: 1.0, steel: 4.0, aluminum: 0.5, brass: 2.5,
  };
  return parseFloat((baseCost * mult[type]).toFixed(2));
}

export function plateTypes(): PlateType[] {
  return ["copper", "zinc", "steel", "aluminum", "brass"];
}
