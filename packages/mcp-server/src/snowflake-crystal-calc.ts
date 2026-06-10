export type SnowflakeCrystal = "dendrite" | "plate" | "column" | "needle" | "graupel";

export function complexityScore(s: SnowflakeCrystal): number {
  const m: Record<SnowflakeCrystal, number> = {
    dendrite: 10, plate: 6, column: 4, needle: 3, graupel: 2,
  };
  return m[s];
}

export function fallSpeed(s: SnowflakeCrystal): number {
  const m: Record<SnowflakeCrystal, number> = {
    dendrite: 3, plate: 4, column: 5, needle: 6, graupel: 10,
  };
  return m[s];
}

export function packingDensity(s: SnowflakeCrystal): number {
  const m: Record<SnowflakeCrystal, number> = {
    dendrite: 3, plate: 5, column: 7, needle: 8, graupel: 10,
  };
  return m[s];
}

export function lightReflection(s: SnowflakeCrystal): number {
  const m: Record<SnowflakeCrystal, number> = {
    dendrite: 10, plate: 8, column: 6, needle: 5, graupel: 3,
  };
  return m[s];
}

export function formationTemperature(s: SnowflakeCrystal): number {
  const m: Record<SnowflakeCrystal, number> = {
    dendrite: 5, plate: 6, column: 4, needle: 7, graupel: 3,
  };
  return m[s];
}

export function classicSymmetry(s: SnowflakeCrystal): boolean {
  const m: Record<SnowflakeCrystal, boolean> = {
    dendrite: true, plate: true, column: false, needle: false, graupel: false,
  };
  return m[s];
}

export function rimedSurface(s: SnowflakeCrystal): boolean {
  const m: Record<SnowflakeCrystal, boolean> = {
    dendrite: false, plate: false, column: false, needle: false, graupel: true,
  };
  return m[s];
}

export function growthHabit(s: SnowflakeCrystal): string {
  const m: Record<SnowflakeCrystal, string> = {
    dendrite: "branching_hexagonal", plate: "flat_hexagonal_disc",
    column: "elongated_prism", needle: "thin_elongated_prism",
    graupel: "rimed_aggregate_pellet",
  };
  return m[s];
}

export function temperatureRange(s: SnowflakeCrystal): string {
  const m: Record<SnowflakeCrystal, string> = {
    dendrite: "minus_12_to_minus_16c", plate: "minus_10_to_minus_20c",
    column: "minus_3_to_minus_8c", needle: "minus_3_to_minus_5c",
    graupel: "varied_supercooled_droplet",
  };
  return m[s];
}

export function snowflakeCrystals(): SnowflakeCrystal[] {
  return ["dendrite", "plate", "column", "needle", "graupel"];
}
