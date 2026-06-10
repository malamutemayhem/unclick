export type ScrubBrushType = "stiff_deck_floor" | "soft_dish_palm" | "grout_detail_narrow" | "bottle_long_handle" | "drill_attachment_power";

export function scrubbingPower(t: ScrubBrushType): number {
  const m: Record<ScrubBrushType, number> = {
    stiff_deck_floor: 9, soft_dish_palm: 5, grout_detail_narrow: 7, bottle_long_handle: 6, drill_attachment_power: 10,
  };
  return m[t];
}

export function surfaceSafe(t: ScrubBrushType): number {
  const m: Record<ScrubBrushType, number> = {
    stiff_deck_floor: 4, soft_dish_palm: 10, grout_detail_narrow: 7, bottle_long_handle: 8, drill_attachment_power: 3,
  };
  return m[t];
}

export function precision(t: ScrubBrushType): number {
  const m: Record<ScrubBrushType, number> = {
    stiff_deck_floor: 3, soft_dish_palm: 6, grout_detail_narrow: 10, bottle_long_handle: 5, drill_attachment_power: 4,
  };
  return m[t];
}

export function ergonomics(t: ScrubBrushType): number {
  const m: Record<ScrubBrushType, number> = {
    stiff_deck_floor: 6, soft_dish_palm: 9, grout_detail_narrow: 5, bottle_long_handle: 8, drill_attachment_power: 10,
  };
  return m[t];
}

export function brushCost(t: ScrubBrushType): number {
  const m: Record<ScrubBrushType, number> = {
    stiff_deck_floor: 4, soft_dish_palm: 3, grout_detail_narrow: 3, bottle_long_handle: 4, drill_attachment_power: 8,
  };
  return m[t];
}

export function replacementHead(t: ScrubBrushType): boolean {
  const m: Record<ScrubBrushType, boolean> = {
    stiff_deck_floor: false, soft_dish_palm: false, grout_detail_narrow: false, bottle_long_handle: true, drill_attachment_power: true,
  };
  return m[t];
}

export function dishwasherSafe(t: ScrubBrushType): boolean {
  const m: Record<ScrubBrushType, boolean> = {
    stiff_deck_floor: false, soft_dish_palm: true, grout_detail_narrow: true, bottle_long_handle: true, drill_attachment_power: false,
  };
  return m[t];
}

export function bristleType(t: ScrubBrushType): string {
  const m: Record<ScrubBrushType, string> = {
    stiff_deck_floor: "palmyra_coconut_fiber",
    soft_dish_palm: "nylon_soft_flex",
    grout_detail_narrow: "nylon_stiff_tapered",
    bottle_long_handle: "nylon_twisted_wire",
    drill_attachment_power: "polypropylene_abrasive",
  };
  return m[t];
}

export function bestSurface(t: ScrubBrushType): string {
  const m: Record<ScrubBrushType, string> = {
    stiff_deck_floor: "concrete_deck_patio",
    soft_dish_palm: "dishes_pots_delicate",
    grout_detail_narrow: "tile_grout_corners",
    bottle_long_handle: "bottles_jars_vases",
    drill_attachment_power: "tub_shower_heavy_grime",
  };
  return m[t];
}

export function scrubBrushes(): ScrubBrushType[] {
  return ["stiff_deck_floor", "soft_dish_palm", "grout_detail_narrow", "bottle_long_handle", "drill_attachment_power"];
}
