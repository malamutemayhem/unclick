export type FlooringType = "hardwood" | "marble" | "terrazzo" | "flagstone" | "parquet";

export function durabilityYears(floor: FlooringType): number {
  const m: Record<FlooringType, number> = {
    hardwood: 25, marble: 100, terrazzo: 75, flagstone: 80, parquet: 20,
  };
  return m[floor];
}

export function hardnessRating(floor: FlooringType): number {
  const m: Record<FlooringType, number> = {
    hardwood: 6, marble: 5, terrazzo: 8, flagstone: 7, parquet: 5,
  };
  return m[floor];
}

export function moistureResistance(floor: FlooringType): number {
  const m: Record<FlooringType, number> = {
    hardwood: 3, marble: 7, terrazzo: 9, flagstone: 6, parquet: 2,
  };
  return m[floor];
}

export function installComplexity(floor: FlooringType): number {
  const m: Record<FlooringType, number> = {
    hardwood: 5, marble: 7, terrazzo: 9, flagstone: 6, parquet: 8,
  };
  return m[floor];
}

export function aestheticVersatility(floor: FlooringType): number {
  const m: Record<FlooringType, number> = {
    hardwood: 7, marble: 8, terrazzo: 9, flagstone: 5, parquet: 10,
  };
  return m[floor];
}

export function underfloorHeatSafe(floor: FlooringType): boolean {
  const m: Record<FlooringType, boolean> = {
    hardwood: false, marble: true, terrazzo: true, flagstone: true, parquet: false,
  };
  return m[floor];
}

export function refinishable(floor: FlooringType): boolean {
  const m: Record<FlooringType, boolean> = {
    hardwood: true, marble: true, terrazzo: true, flagstone: false, parquet: true,
  };
  return m[floor];
}

export function bestApplication(floor: FlooringType): string {
  const m: Record<FlooringType, string> = {
    hardwood: "living_room", marble: "grand_foyer", terrazzo: "public_building",
    flagstone: "courtyard", parquet: "ballroom",
  };
  return m[floor];
}

export function costPerM2(floor: FlooringType): number {
  const m: Record<FlooringType, number> = {
    hardwood: 80, marble: 200, terrazzo: 150, flagstone: 100, parquet: 120,
  };
  return m[floor];
}

export function flooringTypes(): FlooringType[] {
  return ["hardwood", "marble", "terrazzo", "flagstone", "parquet"];
}
