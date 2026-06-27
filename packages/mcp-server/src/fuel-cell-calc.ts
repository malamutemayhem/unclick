export type FuelCellType = "pem" | "sofc" | "alkaline" | "phosphoric_acid" | "direct_methanol";

export function efficiencyPercent(f: FuelCellType): number {
  const m: Record<FuelCellType, number> = {
    pem: 50, sofc: 60, alkaline: 45, phosphoric_acid: 40, direct_methanol: 30,
  };
  return m[f];
}

export function operatingTempC(f: FuelCellType): number {
  const m: Record<FuelCellType, number> = {
    pem: 80, sofc: 800, alkaline: 70, phosphoric_acid: 200, direct_methanol: 60,
  };
  return m[f];
}

export function startupTime(f: FuelCellType): number {
  const m: Record<FuelCellType, number> = {
    pem: 1, sofc: 10, alkaline: 2, phosphoric_acid: 6, direct_methanol: 1,
  };
  return m[f];
}

export function powerDensity(f: FuelCellType): number {
  const m: Record<FuelCellType, number> = {
    pem: 9, sofc: 6, alkaline: 5, phosphoric_acid: 4, direct_methanol: 3,
  };
  return m[f];
}

export function costScore(f: FuelCellType): number {
  const m: Record<FuelCellType, number> = {
    pem: 7, sofc: 9, alkaline: 4, phosphoric_acid: 6, direct_methanol: 5,
  };
  return m[f];
}

export function usesPlatinum(f: FuelCellType): boolean {
  const m: Record<FuelCellType, boolean> = {
    pem: true, sofc: false, alkaline: false, phosphoric_acid: true, direct_methanol: true,
  };
  return m[f];
}

export function portableSize(f: FuelCellType): boolean {
  const m: Record<FuelCellType, boolean> = {
    pem: true, sofc: false, alkaline: false, phosphoric_acid: false, direct_methanol: true,
  };
  return m[f];
}

export function primaryFuel(f: FuelCellType): string {
  const m: Record<FuelCellType, string> = {
    pem: "hydrogen", sofc: "natural_gas", alkaline: "hydrogen",
    phosphoric_acid: "hydrogen", direct_methanol: "methanol",
  };
  return m[f];
}

export function bestApplication(f: FuelCellType): string {
  const m: Record<FuelCellType, string> = {
    pem: "vehicles", sofc: "stationary_power",
    alkaline: "spacecraft", phosphoric_acid: "building_power",
    direct_methanol: "portable_electronics",
  };
  return m[f];
}

export function fuelCellTypes(): FuelCellType[] {
  return ["pem", "sofc", "alkaline", "phosphoric_acid", "direct_methanol"];
}
