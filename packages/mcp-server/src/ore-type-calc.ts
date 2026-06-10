export type OreType = "hematite" | "bauxite" | "chalcopyrite" | "galena" | "cassiterite";

export function metalContent(ore: OreType): number {
  const m: Record<OreType, number> = {
    hematite: 70, bauxite: 50, chalcopyrite: 35, galena: 87, cassiterite: 79,
  };
  return m[ore];
}

export function extractionDifficulty(ore: OreType): number {
  const m: Record<OreType, number> = {
    hematite: 4, bauxite: 7, chalcopyrite: 6, galena: 3, cassiterite: 5,
  };
  return m[ore];
}

export function globalReservesTonnes(ore: OreType): number {
  const m: Record<OreType, number> = {
    hematite: 170000, bauxite: 30000, chalcopyrite: 880, galena: 2000, cassiterite: 4700,
  };
  return m[ore];
}

export function crushability(ore: OreType): number {
  const m: Record<OreType, number> = {
    hematite: 6, bauxite: 8, chalcopyrite: 5, galena: 9, cassiterite: 4,
  };
  return m[ore];
}

export function environmentalImpact(ore: OreType): number {
  const m: Record<OreType, number> = {
    hematite: 5, bauxite: 8, chalcopyrite: 7, galena: 9, cassiterite: 6,
  };
  return m[ore];
}

export function magnetic(ore: OreType): boolean {
  const m: Record<OreType, boolean> = {
    hematite: true, bauxite: false, chalcopyrite: false, galena: false, cassiterite: false,
  };
  return m[ore];
}

export function sulfide(ore: OreType): boolean {
  const m: Record<OreType, boolean> = {
    hematite: false, bauxite: false, chalcopyrite: true, galena: true, cassiterite: false,
  };
  return m[ore];
}

export function extractedMetal(ore: OreType): string {
  const m: Record<OreType, string> = {
    hematite: "iron", bauxite: "aluminum", chalcopyrite: "copper",
    galena: "lead", cassiterite: "tin",
  };
  return m[ore];
}

export function pricePerTonne(ore: OreType): number {
  const m: Record<OreType, number> = {
    hematite: 120, bauxite: 50, chalcopyrite: 300, galena: 200, cassiterite: 500,
  };
  return m[ore];
}

export function oreTypes(): OreType[] {
  return ["hematite", "bauxite", "chalcopyrite", "galena", "cassiterite"];
}
