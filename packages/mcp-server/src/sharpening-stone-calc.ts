export type SharpeningStoneType = "water_stone_japanese" | "oil_stone_arkansas" | "diamond_plate_metal" | "ceramic_stone_fine" | "strop_leather_compound";

export function gritRange(t: SharpeningStoneType): number {
  const m: Record<SharpeningStoneType, number> = {
    water_stone_japanese: 10, oil_stone_arkansas: 7, diamond_plate_metal: 8, ceramic_stone_fine: 6, strop_leather_compound: 4,
  };
  return m[t];
}

export function cutSpeed(t: SharpeningStoneType): number {
  const m: Record<SharpeningStoneType, number> = {
    water_stone_japanese: 9, oil_stone_arkansas: 6, diamond_plate_metal: 10, ceramic_stone_fine: 5, strop_leather_compound: 3,
  };
  return m[t];
}

export function edgeFinish(t: SharpeningStoneType): number {
  const m: Record<SharpeningStoneType, number> = {
    water_stone_japanese: 9, oil_stone_arkansas: 8, diamond_plate_metal: 6, ceramic_stone_fine: 9, strop_leather_compound: 10,
  };
  return m[t];
}

export function durability(t: SharpeningStoneType): number {
  const m: Record<SharpeningStoneType, number> = {
    water_stone_japanese: 4, oil_stone_arkansas: 9, diamond_plate_metal: 10, ceramic_stone_fine: 8, strop_leather_compound: 5,
  };
  return m[t];
}

export function stoneCost(t: SharpeningStoneType): number {
  const m: Record<SharpeningStoneType, number> = {
    water_stone_japanese: 3, oil_stone_arkansas: 3, diamond_plate_metal: 4, ceramic_stone_fine: 3, strop_leather_compound: 2,
  };
  return m[t];
}

export function needsFlat(t: SharpeningStoneType): boolean {
  const m: Record<SharpeningStoneType, boolean> = {
    water_stone_japanese: true, oil_stone_arkansas: false, diamond_plate_metal: false, ceramic_stone_fine: false, strop_leather_compound: false,
  };
  return m[t];
}

export function usesLiquid(t: SharpeningStoneType): boolean {
  const m: Record<SharpeningStoneType, boolean> = {
    water_stone_japanese: true, oil_stone_arkansas: true, diamond_plate_metal: false, ceramic_stone_fine: false, strop_leather_compound: false,
  };
  return m[t];
}

export function abrasive(t: SharpeningStoneType): string {
  const m: Record<SharpeningStoneType, string> = {
    water_stone_japanese: "aluminum_oxide_bond",
    oil_stone_arkansas: "natural_novaculite",
    diamond_plate_metal: "mono_diamond_plate",
    ceramic_stone_fine: "alumina_ceramic_sintered",
    strop_leather_compound: "chromium_oxide_paste",
  };
  return m[t];
}

export function bestUse(t: SharpeningStoneType): string {
  const m: Record<SharpeningStoneType, string> = {
    water_stone_japanese: "quick_sharp_refine",
    oil_stone_arkansas: "traditional_edge_keep",
    diamond_plate_metal: "hard_steel_flatten",
    ceramic_stone_fine: "touch_up_maintain",
    strop_leather_compound: "final_polish_hone",
  };
  return m[t];
}

export function sharpeningStones(): SharpeningStoneType[] {
  return ["water_stone_japanese", "oil_stone_arkansas", "diamond_plate_metal", "ceramic_stone_fine", "strop_leather_compound"];
}
