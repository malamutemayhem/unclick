export type PipeMaterial = "copper" | "pvc" | "pex" | "galvanized" | "cast_iron";

export function lifespanYears(p: PipeMaterial): number {
  const m: Record<PipeMaterial, number> = {
    copper: 70, pvc: 50, pex: 40, galvanized: 40, cast_iron: 80,
  };
  return m[p];
}

export function costPerMeter(p: PipeMaterial): number {
  const m: Record<PipeMaterial, number> = {
    copper: 9, pvc: 3, pex: 4, galvanized: 5, cast_iron: 8,
  };
  return m[p];
}

export function corrosionResistance(p: PipeMaterial): number {
  const m: Record<PipeMaterial, number> = {
    copper: 8, pvc: 10, pex: 10, galvanized: 4, cast_iron: 5,
  };
  return m[p];
}

export function installationEase(p: PipeMaterial): number {
  const m: Record<PipeMaterial, number> = {
    copper: 4, pvc: 8, pex: 10, galvanized: 3, cast_iron: 2,
  };
  return m[p];
}

export function pressureRating(p: PipeMaterial): number {
  const m: Record<PipeMaterial, number> = {
    copper: 8, pvc: 6, pex: 7, galvanized: 9, cast_iron: 10,
  };
  return m[p];
}

export function recyclable(p: PipeMaterial): boolean {
  const m: Record<PipeMaterial, boolean> = {
    copper: true, pvc: false, pex: false, galvanized: true, cast_iron: true,
  };
  return m[p];
}

export function flexibleInstall(p: PipeMaterial): boolean {
  const m: Record<PipeMaterial, boolean> = {
    copper: false, pvc: false, pex: true, galvanized: false, cast_iron: false,
  };
  return m[p];
}

export function bestApplication(p: PipeMaterial): string {
  const m: Record<PipeMaterial, string> = {
    copper: "water_supply_heating", pvc: "drainage_vent",
    pex: "residential_water", galvanized: "fire_sprinkler",
    cast_iron: "sewer_drainage",
  };
  return m[p];
}

export function joinMethod(p: PipeMaterial): string {
  const m: Record<PipeMaterial, string> = {
    copper: "soldering_brazing", pvc: "solvent_cement",
    pex: "crimp_push_fit", galvanized: "threaded",
    cast_iron: "hub_and_spigot",
  };
  return m[p];
}

export function pipeMaterials(): PipeMaterial[] {
  return ["copper", "pvc", "pex", "galvanized", "cast_iron"];
}
