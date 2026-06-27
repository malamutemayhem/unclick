export type WetlandType = "marsh" | "swamp" | "bog" | "fen" | "mangrove";

export function waterDepthCm(wetland: WetlandType): number {
  const m: Record<WetlandType, number> = {
    marsh: 30, swamp: 60, bog: 20, fen: 15, mangrove: 50,
  };
  return m[wetland];
}

export function biodiversityIndex(wetland: WetlandType): number {
  const m: Record<WetlandType, number> = {
    marsh: 7, swamp: 8, bog: 4, fen: 6, mangrove: 9,
  };
  return m[wetland];
}

export function carbonSequestration(wetland: WetlandType): number {
  const m: Record<WetlandType, number> = {
    marsh: 7, swamp: 6, bog: 10, fen: 8, mangrove: 9,
  };
  return m[wetland];
}

export function floodControl(wetland: WetlandType): number {
  const m: Record<WetlandType, number> = {
    marsh: 8, swamp: 7, bog: 5, fen: 6, mangrove: 10,
  };
  return m[wetland];
}

export function waterFiltration(wetland: WetlandType): number {
  const m: Record<WetlandType, number> = {
    marsh: 9, swamp: 6, bog: 7, fen: 8, mangrove: 5,
  };
  return m[wetland];
}

export function treeCover(wetland: WetlandType): boolean {
  const m: Record<WetlandType, boolean> = {
    marsh: false, swamp: true, bog: false, fen: false, mangrove: true,
  };
  return m[wetland];
}

export function acidicWater(wetland: WetlandType): boolean {
  const m: Record<WetlandType, boolean> = {
    marsh: false, swamp: false, bog: true, fen: false, mangrove: false,
  };
  return m[wetland];
}

export function dominantPlant(wetland: WetlandType): string {
  const m: Record<WetlandType, string> = {
    marsh: "cattails", swamp: "cypress", bog: "sphagnum_moss",
    fen: "sedges", mangrove: "mangrove_trees",
  };
  return m[wetland];
}

export function restorationCostPerHa(wetland: WetlandType): number {
  const m: Record<WetlandType, number> = {
    marsh: 5000, swamp: 8000, bog: 3000, fen: 4000, mangrove: 10000,
  };
  return m[wetland];
}

export function wetlandTypes(): WetlandType[] {
  return ["marsh", "swamp", "bog", "fen", "mangrove"];
}
