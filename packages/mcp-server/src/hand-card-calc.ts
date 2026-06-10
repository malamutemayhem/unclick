export type HandCardType = "cotton_card_fine" | "wool_card_standard" | "flicker_card_lock" | "drum_carder_table" | "blending_board_flat";

export function fiberAlign(t: HandCardType): number {
  const m: Record<HandCardType, number> = {
    cotton_card_fine: 8, wool_card_standard: 7, flicker_card_lock: 5, drum_carder_table: 10, blending_board_flat: 6,
  };
  return m[t];
}

export function speedOutput(t: HandCardType): number {
  const m: Record<HandCardType, number> = {
    cotton_card_fine: 5, wool_card_standard: 6, flicker_card_lock: 3, drum_carder_table: 10, blending_board_flat: 7,
  };
  return m[t];
}

export function colorBlend(t: HandCardType): number {
  const m: Record<HandCardType, number> = {
    cotton_card_fine: 6, wool_card_standard: 7, flicker_card_lock: 3, drum_carder_table: 8, blending_board_flat: 10,
  };
  return m[t];
}

export function portability(t: HandCardType): number {
  const m: Record<HandCardType, number> = {
    cotton_card_fine: 9, wool_card_standard: 9, flicker_card_lock: 10, drum_carder_table: 2, blending_board_flat: 5,
  };
  return m[t];
}

export function cardCost(t: HandCardType): number {
  const m: Record<HandCardType, number> = {
    cotton_card_fine: 2, wool_card_standard: 2, flicker_card_lock: 1, drum_carder_table: 5, blending_board_flat: 3,
  };
  return m[t];
}

export function handheld(t: HandCardType): boolean {
  const m: Record<HandCardType, boolean> = {
    cotton_card_fine: true, wool_card_standard: true, flicker_card_lock: true, drum_carder_table: false, blending_board_flat: false,
  };
  return m[t];
}

export function motorized(t: HandCardType): boolean {
  const m: Record<HandCardType, boolean> = {
    cotton_card_fine: false, wool_card_standard: false, flicker_card_lock: false, drum_carder_table: false, blending_board_flat: false,
  };
  return m[t];
}

export function toothDensity(t: HandCardType): string {
  const m: Record<HandCardType, string> = {
    cotton_card_fine: "fine_tooth_72tpi",
    wool_card_standard: "medium_tooth_54tpi",
    flicker_card_lock: "coarse_tooth_36tpi",
    drum_carder_table: "variable_tooth_cloth",
    blending_board_flat: "medium_tooth_board",
  };
  return m[t];
}

export function bestFiber(t: HandCardType): string {
  const m: Record<HandCardType, string> = {
    cotton_card_fine: "cotton_short_staple",
    wool_card_standard: "wool_medium_staple",
    flicker_card_lock: "mohair_long_lock",
    drum_carder_table: "large_batch_blend",
    blending_board_flat: "art_batt_gradient",
  };
  return m[t];
}

export function handCards(): HandCardType[] {
  return ["cotton_card_fine", "wool_card_standard", "flicker_card_lock", "drum_carder_table", "blending_board_flat"];
}
