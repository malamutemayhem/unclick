export type ArrowheadType = "field_point" | "broadhead" | "judo" | "blunt" | "bodkin";

export function penetration(a: ArrowheadType): number {
  const m: Record<ArrowheadType, number> = {
    field_point: 7, broadhead: 10, judo: 3, blunt: 1, bodkin: 9,
  };
  return m[a];
}

export function woundChannel(a: ArrowheadType): number {
  const m: Record<ArrowheadType, number> = {
    field_point: 3, broadhead: 10, judo: 2, blunt: 1, bodkin: 4,
  };
  return m[a];
}

export function targetDamage(a: ArrowheadType): number {
  const m: Record<ArrowheadType, number> = {
    field_point: 3, broadhead: 8, judo: 2, blunt: 1, bodkin: 5,
  };
  return m[a];
}

export function flightAccuracy(a: ArrowheadType): number {
  const m: Record<ArrowheadType, number> = {
    field_point: 10, broadhead: 6, judo: 7, blunt: 8, bodkin: 9,
  };
  return m[a];
}

export function recoverability(a: ArrowheadType): number {
  const m: Record<ArrowheadType, number> = {
    field_point: 8, broadhead: 4, judo: 10, blunt: 9, bodkin: 6,
  };
  return m[a];
}

export function legalForHunting(a: ArrowheadType): boolean {
  const m: Record<ArrowheadType, boolean> = {
    field_point: false, broadhead: true, judo: false, blunt: false, bodkin: false,
  };
  return m[a];
}

export function hasCuttingEdge(a: ArrowheadType): boolean {
  const m: Record<ArrowheadType, boolean> = {
    field_point: false, broadhead: true, judo: false, blunt: false, bodkin: false,
  };
  return m[a];
}

export function primaryUse(a: ArrowheadType): string {
  const m: Record<ArrowheadType, string> = {
    field_point: "target_practice", broadhead: "big_game_hunting",
    judo: "small_game_stump", blunt: "bird_small_game",
    bodkin: "armor_penetration",
  };
  return m[a];
}

export function historicalEra(a: ArrowheadType): string {
  const m: Record<ArrowheadType, string> = {
    field_point: "modern", broadhead: "ancient_to_modern",
    judo: "modern_sport", blunt: "ancient_to_modern",
    bodkin: "medieval",
  };
  return m[a];
}

export function arrowheadTypes(): ArrowheadType[] {
  return ["field_point", "broadhead", "judo", "blunt", "bodkin"];
}
