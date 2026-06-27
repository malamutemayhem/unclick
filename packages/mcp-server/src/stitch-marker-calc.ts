export type StitchMarkerType = "split_ring_metal" | "locking_plastic_clip" | "bulb_pin_removable" | "ring_closed_slide" | "digital_row_counter";

export function easeOfUse(t: StitchMarkerType): number {
  const m: Record<StitchMarkerType, number> = {
    split_ring_metal: 7, locking_plastic_clip: 9, bulb_pin_removable: 8, ring_closed_slide: 10, digital_row_counter: 6,
  };
  return m[t];
}

export function stayPut(t: StitchMarkerType): number {
  const m: Record<StitchMarkerType, number> = {
    split_ring_metal: 8, locking_plastic_clip: 10, bulb_pin_removable: 7, ring_closed_slide: 9, digital_row_counter: 8,
  };
  return m[t];
}

export function yarnSafe(t: StitchMarkerType): number {
  const m: Record<StitchMarkerType, number> = {
    split_ring_metal: 6, locking_plastic_clip: 9, bulb_pin_removable: 5, ring_closed_slide: 10, digital_row_counter: 8,
  };
  return m[t];
}

export function visibility(t: StitchMarkerType): number {
  const m: Record<StitchMarkerType, number> = {
    split_ring_metal: 6, locking_plastic_clip: 8, bulb_pin_removable: 7, ring_closed_slide: 7, digital_row_counter: 10,
  };
  return m[t];
}

export function markerCost(t: StitchMarkerType): number {
  const m: Record<StitchMarkerType, number> = {
    split_ring_metal: 1, locking_plastic_clip: 1, bulb_pin_removable: 1, ring_closed_slide: 1, digital_row_counter: 2,
  };
  return m[t];
}

export function removable(t: StitchMarkerType): boolean {
  const m: Record<StitchMarkerType, boolean> = {
    split_ring_metal: true, locking_plastic_clip: true, bulb_pin_removable: true, ring_closed_slide: false, digital_row_counter: true,
  };
  return m[t];
}

export function countsRows(t: StitchMarkerType): boolean {
  const m: Record<StitchMarkerType, boolean> = {
    split_ring_metal: false, locking_plastic_clip: false, bulb_pin_removable: false, ring_closed_slide: false, digital_row_counter: true,
  };
  return m[t];
}

export function markerMaterial(t: StitchMarkerType): string {
  const m: Record<StitchMarkerType, string> = {
    split_ring_metal: "stainless_split_ring",
    locking_plastic_clip: "abs_plastic_lobster",
    bulb_pin_removable: "coiless_safety_pin",
    ring_closed_slide: "smooth_resin_ring",
    digital_row_counter: "lcd_digital_clip",
  };
  return m[t];
}

export function bestCraft(t: StitchMarkerType): string {
  const m: Record<StitchMarkerType, string> = {
    split_ring_metal: "crochet_amigurumi",
    locking_plastic_clip: "knit_pattern_repeat",
    bulb_pin_removable: "lace_delicate_mark",
    ring_closed_slide: "circular_knitting_round",
    digital_row_counter: "complex_pattern_track",
  };
  return m[t];
}

export function stitchMarkers(): StitchMarkerType[] {
  return ["split_ring_metal", "locking_plastic_clip", "bulb_pin_removable", "ring_closed_slide", "digital_row_counter"];
}
