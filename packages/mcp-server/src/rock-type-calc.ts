export type RockType = "igneous" | "sedimentary" | "metamorphic" | "volcanic" | "plutonic";

export function hardnessRange(rock: RockType): number {
  const m: Record<RockType, number> = {
    igneous: 7, sedimentary: 4, metamorphic: 6, volcanic: 6, plutonic: 8,
  };
  return m[rock];
}

export function densityGCm3(rock: RockType): number {
  const m: Record<RockType, number> = {
    igneous: 2.8, sedimentary: 2.4, metamorphic: 2.7, volcanic: 2.5, plutonic: 2.9,
  };
  return m[rock];
}

export function porosity(rock: RockType): number {
  const m: Record<RockType, number> = {
    igneous: 3, sedimentary: 8, metamorphic: 2, volcanic: 7, plutonic: 1,
  };
  return m[rock];
}

export function weatheringResistance(rock: RockType): number {
  const m: Record<RockType, number> = {
    igneous: 7, sedimentary: 3, metamorphic: 6, volcanic: 5, plutonic: 8,
  };
  return m[rock];
}

export function fossilContent(rock: RockType): number {
  const m: Record<RockType, number> = {
    igneous: 0, sedimentary: 9, metamorphic: 2, volcanic: 0, plutonic: 0,
  };
  return m[rock];
}

export function crystalline(rock: RockType): boolean {
  const m: Record<RockType, boolean> = {
    igneous: true, sedimentary: false, metamorphic: true, volcanic: false, plutonic: true,
  };
  return m[rock];
}

export function layered(rock: RockType): boolean {
  const m: Record<RockType, boolean> = {
    igneous: false, sedimentary: true, metamorphic: true, volcanic: false, plutonic: false,
  };
  return m[rock];
}

export function exampleRock(rock: RockType): string {
  const m: Record<RockType, string> = {
    igneous: "granite", sedimentary: "limestone", metamorphic: "marble",
    volcanic: "basalt", plutonic: "gabbro",
  };
  return m[rock];
}

export function buildingMaterialValue(rock: RockType): number {
  const m: Record<RockType, number> = {
    igneous: 8, sedimentary: 6, metamorphic: 9, volcanic: 5, plutonic: 7,
  };
  return m[rock];
}

export function rockTypes(): RockType[] {
  return ["igneous", "sedimentary", "metamorphic", "volcanic", "plutonic"];
}
