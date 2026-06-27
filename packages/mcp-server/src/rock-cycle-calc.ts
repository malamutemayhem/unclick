export type RockType = "igneous" | "sedimentary" | "metamorphic" | "volcanic" | "plutonic";

export function formationTemperature(r: RockType): number {
  const m: Record<RockType, number> = {
    igneous: 900, sedimentary: 25, metamorphic: 600, volcanic: 1100, plutonic: 800,
  };
  return m[r];
}

export function hardnessScale(r: RockType): number {
  const m: Record<RockType, number> = {
    igneous: 7, sedimentary: 4, metamorphic: 8, volcanic: 6, plutonic: 7,
  };
  return m[r];
}

export function porosity(r: RockType): number {
  const m: Record<RockType, number> = {
    igneous: 3, sedimentary: 8, metamorphic: 2, volcanic: 9, plutonic: 1,
  };
  return m[r];
}

export function weatheringResistance(r: RockType): number {
  const m: Record<RockType, number> = {
    igneous: 8, sedimentary: 3, metamorphic: 9, volcanic: 5, plutonic: 8,
  };
  return m[r];
}

export function fossilLikelihood(r: RockType): number {
  const m: Record<RockType, number> = {
    igneous: 0, sedimentary: 10, metamorphic: 2, volcanic: 0, plutonic: 0,
  };
  return m[r];
}

export function crystalline(r: RockType): boolean {
  const m: Record<RockType, boolean> = {
    igneous: true, sedimentary: false, metamorphic: true, volcanic: false, plutonic: true,
  };
  return m[r];
}

export function formedUnderground(r: RockType): boolean {
  const m: Record<RockType, boolean> = {
    igneous: false, sedimentary: false, metamorphic: true, volcanic: false, plutonic: true,
  };
  return m[r];
}

export function exampleRock(r: RockType): string {
  const m: Record<RockType, string> = {
    igneous: "granite", sedimentary: "sandstone", metamorphic: "marble",
    volcanic: "basalt", plutonic: "gabbro",
  };
  return m[r];
}

export function formationProcess(r: RockType): string {
  const m: Record<RockType, string> = {
    igneous: "cooling_magma", sedimentary: "compaction",
    metamorphic: "heat_and_pressure", volcanic: "lava_cooling",
    plutonic: "slow_crystallization",
  };
  return m[r];
}

export function rockTypes(): RockType[] {
  return ["igneous", "sedimentary", "metamorphic", "volcanic", "plutonic"];
}
