export type BeetleType = "rhinoceros" | "ladybug" | "firefly" | "dung" | "jewel";

export function lengthMm(beetle: BeetleType): number {
  const m: Record<BeetleType, number> = {
    rhinoceros: 60, ladybug: 5, firefly: 12, dung: 30, jewel: 20,
  };
  return m[beetle];
}

export function strengthToWeight(beetle: BeetleType): number {
  const m: Record<BeetleType, number> = {
    rhinoceros: 10, ladybug: 3, firefly: 2, dung: 9, jewel: 4,
  };
  return m[beetle];
}

export function elytraHardness(beetle: BeetleType): number {
  const m: Record<BeetleType, number> = {
    rhinoceros: 9, ladybug: 5, firefly: 3, dung: 7, jewel: 8,
  };
  return m[beetle];
}

export function ecologicalImportance(beetle: BeetleType): number {
  const m: Record<BeetleType, number> = {
    rhinoceros: 4, ladybug: 9, firefly: 5, dung: 10, jewel: 3,
  };
  return m[beetle];
}

export function speciesCount(beetle: BeetleType): number {
  const m: Record<BeetleType, number> = {
    rhinoceros: 1500, ladybug: 5000, firefly: 2000, dung: 7000, jewel: 15000,
  };
  return m[beetle];
}

export function bioluminescent(beetle: BeetleType): boolean {
  const m: Record<BeetleType, boolean> = {
    rhinoceros: false, ladybug: false, firefly: true, dung: false, jewel: false,
  };
  return m[beetle];
}

export function beneficialToFarmers(beetle: BeetleType): boolean {
  const m: Record<BeetleType, boolean> = {
    rhinoceros: false, ladybug: true, firefly: false, dung: true, jewel: false,
  };
  return m[beetle];
}

export function primaryRole(beetle: BeetleType): string {
  const m: Record<BeetleType, string> = {
    rhinoceros: "decomposer", ladybug: "pest_control", firefly: "pollinator",
    dung: "nutrient_recycler", jewel: "wood_borer",
  };
  return m[beetle];
}

export function collectorsValue(beetle: BeetleType): number {
  const m: Record<BeetleType, number> = {
    rhinoceros: 8, ladybug: 2, firefly: 3, dung: 4, jewel: 10,
  };
  return m[beetle];
}

export function beetleTypes(): BeetleType[] {
  return ["rhinoceros", "ladybug", "firefly", "dung", "jewel"];
}
