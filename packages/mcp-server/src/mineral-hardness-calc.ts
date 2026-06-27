export type MineralType = "talc" | "quartz" | "feldspar" | "diamond" | "corundum";

export function mohsHardness(mineral: MineralType): number {
  const m: Record<MineralType, number> = {
    talc: 1, quartz: 7, feldspar: 6, diamond: 10, corundum: 9,
  };
  return m[mineral];
}

export function specificGravity(mineral: MineralType): number {
  const m: Record<MineralType, number> = {
    talc: 2.75, quartz: 2.65, feldspar: 2.56, diamond: 3.52, corundum: 4.0,
  };
  return m[mineral];
}

export function crustalAbundance(mineral: MineralType): number {
  const m: Record<MineralType, number> = {
    talc: 3, quartz: 9, feldspar: 10, diamond: 1, corundum: 2,
  };
  return m[mineral];
}

export function cleavageQuality(mineral: MineralType): number {
  const m: Record<MineralType, number> = {
    talc: 8, quartz: 1, feldspar: 7, diamond: 9, corundum: 2,
  };
  return m[mineral];
}

export function luster(mineral: MineralType): number {
  const m: Record<MineralType, number> = {
    talc: 3, quartz: 6, feldspar: 5, diamond: 10, corundum: 8,
  };
  return m[mineral];
}

export function gemQuality(mineral: MineralType): boolean {
  const m: Record<MineralType, boolean> = {
    talc: false, quartz: true, feldspar: true, diamond: true, corundum: true,
  };
  return m[mineral];
}

export function industrialUse(mineral: MineralType): boolean {
  const m: Record<MineralType, boolean> = {
    talc: true, quartz: true, feldspar: true, diamond: true, corundum: true,
  };
  return m[mineral];
}

export function bestApplication(mineral: MineralType): string {
  const m: Record<MineralType, string> = {
    talc: "cosmetics", quartz: "electronics", feldspar: "ceramics",
    diamond: "cutting", corundum: "abrasive",
  };
  return m[mineral];
}

export function valuePerCarat(mineral: MineralType): number {
  const m: Record<MineralType, number> = {
    talc: 0.01, quartz: 5, feldspar: 2, diamond: 5000, corundum: 1000,
  };
  return m[mineral];
}

export function mineralTypes(): MineralType[] {
  return ["talc", "quartz", "feldspar", "diamond", "corundum"];
}
