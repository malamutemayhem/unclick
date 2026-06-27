export type CrystalSystem = "cubic" | "hexagonal" | "tetragonal" | "orthorhombic" | "monoclinic";

export function symmetryAxes(crystal: CrystalSystem): number {
  const m: Record<CrystalSystem, number> = {
    cubic: 13, hexagonal: 7, tetragonal: 5, orthorhombic: 3, monoclinic: 1,
  };
  return m[crystal];
}

export function axisAngles(crystal: CrystalSystem): number {
  const m: Record<CrystalSystem, number> = {
    cubic: 90, hexagonal: 120, tetragonal: 90, orthorhombic: 90, monoclinic: 100,
  };
  return m[crystal];
}

export function uniqueAxisLengths(crystal: CrystalSystem): number {
  const m: Record<CrystalSystem, number> = {
    cubic: 1, hexagonal: 2, tetragonal: 2, orthorhombic: 3, monoclinic: 3,
  };
  return m[crystal];
}

export function naturalFrequency(crystal: CrystalSystem): number {
  const m: Record<CrystalSystem, number> = {
    cubic: 8, hexagonal: 6, tetragonal: 5, orthorhombic: 3, monoclinic: 2,
  };
  return m[crystal];
}

export function opticalComplexity(crystal: CrystalSystem): number {
  const m: Record<CrystalSystem, number> = {
    cubic: 1, hexagonal: 5, tetragonal: 5, orthorhombic: 8, monoclinic: 9,
  };
  return m[crystal];
}

export function isotropic(crystal: CrystalSystem): boolean {
  const m: Record<CrystalSystem, boolean> = {
    cubic: true, hexagonal: false, tetragonal: false, orthorhombic: false, monoclinic: false,
  };
  return m[crystal];
}

export function uniaxial(crystal: CrystalSystem): boolean {
  const m: Record<CrystalSystem, boolean> = {
    cubic: false, hexagonal: true, tetragonal: true, orthorhombic: false, monoclinic: false,
  };
  return m[crystal];
}

export function exampleMineral(crystal: CrystalSystem): string {
  const m: Record<CrystalSystem, string> = {
    cubic: "diamond", hexagonal: "quartz", tetragonal: "zircon",
    orthorhombic: "olivine", monoclinic: "gypsum",
  };
  return m[crystal];
}

export function packingEfficiency(crystal: CrystalSystem): number {
  const m: Record<CrystalSystem, number> = {
    cubic: 74, hexagonal: 74, tetragonal: 68, orthorhombic: 60, monoclinic: 55,
  };
  return m[crystal];
}

export function crystalSystems(): CrystalSystem[] {
  return ["cubic", "hexagonal", "tetragonal", "orthorhombic", "monoclinic"];
}
