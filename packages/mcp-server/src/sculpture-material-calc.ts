export type SculptureMaterial = "marble" | "bronze" | "clay" | "wood" | "steel";

export function durability(s: SculptureMaterial): number {
  const m: Record<SculptureMaterial, number> = {
    marble: 9, bronze: 10, clay: 3, wood: 5, steel: 8,
  };
  return m[s];
}

export function detailPotential(s: SculptureMaterial): number {
  const m: Record<SculptureMaterial, number> = {
    marble: 10, bronze: 9, clay: 8, wood: 6, steel: 5,
  };
  return m[s];
}

export function workability(s: SculptureMaterial): number {
  const m: Record<SculptureMaterial, number> = {
    marble: 5, bronze: 4, clay: 10, wood: 7, steel: 3,
  };
  return m[s];
}

export function weatherResistance(s: SculptureMaterial): number {
  const m: Record<SculptureMaterial, number> = {
    marble: 6, bronze: 9, clay: 2, wood: 3, steel: 7,
  };
  return m[s];
}

export function costPerKg(s: SculptureMaterial): number {
  const m: Record<SculptureMaterial, number> = {
    marble: 7, bronze: 9, clay: 1, wood: 3, steel: 4,
  };
  return m[s];
}

export function subtractiveProcess(s: SculptureMaterial): boolean {
  const m: Record<SculptureMaterial, boolean> = {
    marble: true, bronze: false, clay: false, wood: true, steel: true,
  };
  return m[s];
}

export function requiresFiring(s: SculptureMaterial): boolean {
  const m: Record<SculptureMaterial, boolean> = {
    marble: false, bronze: true, clay: true, wood: false, steel: true,
  };
  return m[s];
}

export function famousSculptor(s: SculptureMaterial): string {
  const m: Record<SculptureMaterial, string> = {
    marble: "michelangelo", bronze: "rodin", clay: "giacometti",
    wood: "brancusi", steel: "calder",
  };
  return m[s];
}

export function typicalScale(s: SculptureMaterial): string {
  const m: Record<SculptureMaterial, string> = {
    marble: "life_size", bronze: "monumental",
    clay: "small_maquette", wood: "medium",
    steel: "large_installation",
  };
  return m[s];
}

export function sculptureMaterials(): SculptureMaterial[] {
  return ["marble", "bronze", "clay", "wood", "steel"];
}
