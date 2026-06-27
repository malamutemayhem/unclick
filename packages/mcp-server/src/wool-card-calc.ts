export type WoolCardType = "flat_hand_pair" | "drum_carder_large" | "flick_carder_small" | "blending_board_flat" | "mini_combs_fine";

export function fiberAlign(t: WoolCardType): number {
  const m: Record<WoolCardType, number> = {
    flat_hand_pair: 7, drum_carder_large: 9, flick_carder_small: 5, blending_board_flat: 8, mini_combs_fine: 10,
  };
  return m[t];
}

export function batchSpeed(t: WoolCardType): number {
  const m: Record<WoolCardType, number> = {
    flat_hand_pair: 5, drum_carder_large: 10, flick_carder_small: 3, blending_board_flat: 6, mini_combs_fine: 4,
  };
  return m[t];
}

export function blendQuality(t: WoolCardType): number {
  const m: Record<WoolCardType, number> = {
    flat_hand_pair: 8, drum_carder_large: 7, flick_carder_small: 5, blending_board_flat: 10, mini_combs_fine: 6,
  };
  return m[t];
}

export function portability(t: WoolCardType): number {
  const m: Record<WoolCardType, number> = {
    flat_hand_pair: 8, drum_carder_large: 2, flick_carder_small: 10, blending_board_flat: 5, mini_combs_fine: 9,
  };
  return m[t];
}

export function cardCost(t: WoolCardType): number {
  const m: Record<WoolCardType, number> = {
    flat_hand_pair: 2, drum_carder_large: 3, flick_carder_small: 1, blending_board_flat: 2, mini_combs_fine: 2,
  };
  return m[t];
}

export function motorized(t: WoolCardType): boolean {
  const m: Record<WoolCardType, boolean> = {
    flat_hand_pair: false, drum_carder_large: true, flick_carder_small: false, blending_board_flat: false, mini_combs_fine: false,
  };
  return m[t];
}

export function paired(t: WoolCardType): boolean {
  const m: Record<WoolCardType, boolean> = {
    flat_hand_pair: true, drum_carder_large: false, flick_carder_small: false, blending_board_flat: false, mini_combs_fine: true,
  };
  return m[t];
}

export function teethType(t: WoolCardType): string {
  const m: Record<WoolCardType, string> = {
    flat_hand_pair: "bent_wire_cloth",
    drum_carder_large: "carding_cloth_drum",
    flick_carder_small: "single_pad_flick",
    blending_board_flat: "carding_cloth_board",
    mini_combs_fine: "steel_tine_row",
  };
  return m[t];
}

export function bestUse(t: WoolCardType): string {
  const m: Record<WoolCardType, string> = {
    flat_hand_pair: "rolag_prep_spin",
    drum_carder_large: "bulk_batt_make",
    flick_carder_small: "lock_tip_open",
    blending_board_flat: "color_blend_rolag",
    mini_combs_fine: "top_prep_worsted",
  };
  return m[t];
}

export function woolCards(): WoolCardType[] {
  return ["flat_hand_pair", "drum_carder_large", "flick_carder_small", "blending_board_flat", "mini_combs_fine"];
}
