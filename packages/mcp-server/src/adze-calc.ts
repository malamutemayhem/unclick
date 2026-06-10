export type AdzeType = "hand_adze_short" | "foot_adze_long" | "gutter_adze_curved" | "lipped_adze_bowl" | "ship_adze_flat";

export function choppingPower(t: AdzeType): number {
  const m: Record<AdzeType, number> = {
    hand_adze_short: 5, foot_adze_long: 9, gutter_adze_curved: 6, lipped_adze_bowl: 7, ship_adze_flat: 10,
  };
  return m[t];
}

export function hollowAbility(t: AdzeType): number {
  const m: Record<AdzeType, number> = {
    hand_adze_short: 6, foot_adze_long: 5, gutter_adze_curved: 10, lipped_adze_bowl: 9, ship_adze_flat: 4,
  };
  return m[t];
}

export function surfaceFinish(t: AdzeType): number {
  const m: Record<AdzeType, number> = {
    hand_adze_short: 7, foot_adze_long: 6, gutter_adze_curved: 7, lipped_adze_bowl: 8, ship_adze_flat: 9,
  };
  return m[t];
}

export function handleLength(t: AdzeType): number {
  const m: Record<AdzeType, number> = {
    hand_adze_short: 3, foot_adze_long: 9, gutter_adze_curved: 7, lipped_adze_bowl: 6, ship_adze_flat: 10,
  };
  return m[t];
}

export function adzeCost(t: AdzeType): number {
  const m: Record<AdzeType, number> = {
    hand_adze_short: 2, foot_adze_long: 3, gutter_adze_curved: 3, lipped_adze_bowl: 3, ship_adze_flat: 3,
  };
  return m[t];
}

export function oneHand(t: AdzeType): boolean {
  const m: Record<AdzeType, boolean> = {
    hand_adze_short: true, foot_adze_long: false, gutter_adze_curved: false, lipped_adze_bowl: true, ship_adze_flat: false,
  };
  return m[t];
}

export function curvedBlade(t: AdzeType): boolean {
  const m: Record<AdzeType, boolean> = {
    hand_adze_short: false, foot_adze_long: false, gutter_adze_curved: true, lipped_adze_bowl: true, ship_adze_flat: false,
  };
  return m[t];
}

export function headWeight(t: AdzeType): string {
  const m: Record<AdzeType, string> = {
    hand_adze_short: "light_forged_head",
    foot_adze_long: "heavy_forged_head",
    gutter_adze_curved: "medium_curved_head",
    lipped_adze_bowl: "medium_lipped_head",
    ship_adze_flat: "heavy_flat_head",
  };
  return m[t];
}

export function bestUse(t: AdzeType): string {
  const m: Record<AdzeType, string> = {
    hand_adze_short: "small_bowl_rough",
    foot_adze_long: "beam_flatten_hew",
    gutter_adze_curved: "trough_gutter_carve",
    lipped_adze_bowl: "deep_bowl_hollow",
    ship_adze_flat: "timber_flat_surface",
  };
  return m[t];
}

export function adzes(): AdzeType[] {
  return ["hand_adze_short", "foot_adze_long", "gutter_adze_curved", "lipped_adze_bowl", "ship_adze_flat"];
}
