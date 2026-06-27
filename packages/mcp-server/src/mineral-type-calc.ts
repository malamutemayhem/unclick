export type MineralType = "quartz" | "feldspar" | "mica" | "calcite" | "olivine";

export function hardnessMohs(mineral: MineralType): number {
  const m: Record<MineralType, number> = {
    quartz: 7, feldspar: 6, mica: 2.5, calcite: 3, olivine: 6.5,
  };
  return m[mineral];
}

export function specificGravity(mineral: MineralType): number {
  const m: Record<MineralType, number> = {
    quartz: 2.65, feldspar: 2.56, mica: 2.8, calcite: 2.71, olivine: 3.3,
  };
  return m[mineral];
}

export function crustalAbundance(mineral: MineralType): number {
  const m: Record<MineralType, number> = {
    quartz: 9, feldspar: 10, mica: 5, calcite: 7, olivine: 4,
  };
  return m[mineral];
}

export function cleavagePlanes(mineral: MineralType): number {
  const m: Record<MineralType, number> = {
    quartz: 0, feldspar: 2, mica: 1, calcite: 3, olivine: 0,
  };
  return m[mineral];
}

export function luster(mineral: MineralType): number {
  const m: Record<MineralType, number> = {
    quartz: 7, feldspar: 6, mica: 9, calcite: 5, olivine: 7,
  };
  return m[mineral];
}

export function transparent(mineral: MineralType): boolean {
  const m: Record<MineralType, boolean> = {
    quartz: true, feldspar: false, mica: true, calcite: true, olivine: true,
  };
  return m[mineral];
}

export function effervescesInAcid(mineral: MineralType): boolean {
  const m: Record<MineralType, boolean> = {
    quartz: false, feldspar: false, mica: false, calcite: true, olivine: false,
  };
  return m[mineral];
}

export function crystalSystem(mineral: MineralType): string {
  const m: Record<MineralType, string> = {
    quartz: "hexagonal", feldspar: "monoclinic", mica: "monoclinic",
    calcite: "trigonal", olivine: "orthorhombic",
  };
  return m[mineral];
}

export function industrialUse(mineral: MineralType): string {
  const m: Record<MineralType, string> = {
    quartz: "electronics", feldspar: "ceramics", mica: "insulation",
    calcite: "cement", olivine: "refractories",
  };
  return m[mineral];
}

export function mineralTypes(): MineralType[] {
  return ["quartz", "feldspar", "mica", "calcite", "olivine"];
}
