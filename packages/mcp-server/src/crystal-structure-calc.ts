export type CrystalStructure = "fcc" | "bcc" | "hcp" | "diamond_cubic" | "simple_cubic";

export function atomsPerUnitCell(c: CrystalStructure): number {
  const m: Record<CrystalStructure, number> = {
    fcc: 4, bcc: 2, hcp: 6, diamond_cubic: 8, simple_cubic: 1,
  };
  return m[c];
}

export function packingFraction(c: CrystalStructure): number {
  const m: Record<CrystalStructure, number> = {
    fcc: 74, bcc: 68, hcp: 74, diamond_cubic: 34, simple_cubic: 52,
  };
  return m[c];
}

export function coordinationNumber(c: CrystalStructure): number {
  const m: Record<CrystalStructure, number> = {
    fcc: 12, bcc: 8, hcp: 12, diamond_cubic: 4, simple_cubic: 6,
  };
  return m[c];
}

export function ductilityScore(c: CrystalStructure): number {
  const m: Record<CrystalStructure, number> = {
    fcc: 10, bcc: 6, hcp: 3, diamond_cubic: 1, simple_cubic: 2,
  };
  return m[c];
}

export function slipSystems(c: CrystalStructure): number {
  const m: Record<CrystalStructure, number> = {
    fcc: 12, bcc: 48, hcp: 3, diamond_cubic: 12, simple_cubic: 6,
  };
  return m[c];
}

export function closePacked(c: CrystalStructure): boolean {
  const m: Record<CrystalStructure, boolean> = {
    fcc: true, bcc: false, hcp: true, diamond_cubic: false, simple_cubic: false,
  };
  return m[c];
}

export function commonInNature(c: CrystalStructure): boolean {
  const m: Record<CrystalStructure, boolean> = {
    fcc: true, bcc: true, hcp: true, diamond_cubic: true, simple_cubic: false,
  };
  return m[c];
}

export function exampleMetal(c: CrystalStructure): string {
  const m: Record<CrystalStructure, string> = {
    fcc: "copper_aluminum", bcc: "iron_chromium",
    hcp: "titanium_zinc", diamond_cubic: "silicon_germanium",
    simple_cubic: "polonium",
  };
  return m[c];
}

export function symmetryGroup(c: CrystalStructure): string {
  const m: Record<CrystalStructure, string> = {
    fcc: "cubic_fm3m", bcc: "cubic_im3m",
    hcp: "hexagonal_p63mmc", diamond_cubic: "cubic_fd3m",
    simple_cubic: "cubic_pm3m",
  };
  return m[c];
}

export function crystalStructures(): CrystalStructure[] {
  return ["fcc", "bcc", "hcp", "diamond_cubic", "simple_cubic"];
}
