export type TrimSawType = "diamond_blade_thin" | "sintered_rim_wet" | "notched_rim_dry" | "wire_blade_scroll" | "band_saw_continuous";

export function cutSpeed(t: TrimSawType): number {
  const m: Record<TrimSawType, number> = {
    diamond_blade_thin: 8, sintered_rim_wet: 9, notched_rim_dry: 7, wire_blade_scroll: 5, band_saw_continuous: 10,
  };
  return m[t];
}

export function cutPrecision(t: TrimSawType): number {
  const m: Record<TrimSawType, number> = {
    diamond_blade_thin: 9, sintered_rim_wet: 7, notched_rim_dry: 6, wire_blade_scroll: 10, band_saw_continuous: 5,
  };
  return m[t];
}

export function materialWaste(t: TrimSawType): number {
  const m: Record<TrimSawType, number> = {
    diamond_blade_thin: 9, sintered_rim_wet: 6, notched_rim_dry: 5, wire_blade_scroll: 10, band_saw_continuous: 4,
  };
  return m[t];
}

export function bladeLife(t: TrimSawType): number {
  const m: Record<TrimSawType, number> = {
    diamond_blade_thin: 7, sintered_rim_wet: 10, notched_rim_dry: 6, wire_blade_scroll: 4, band_saw_continuous: 8,
  };
  return m[t];
}

export function sawCost(t: TrimSawType): number {
  const m: Record<TrimSawType, number> = {
    diamond_blade_thin: 2, sintered_rim_wet: 3, notched_rim_dry: 1, wire_blade_scroll: 2, band_saw_continuous: 3,
  };
  return m[t];
}

export function needsCoolant(t: TrimSawType): boolean {
  const m: Record<TrimSawType, boolean> = {
    diamond_blade_thin: true, sintered_rim_wet: true, notched_rim_dry: false, wire_blade_scroll: true, band_saw_continuous: true,
  };
  return m[t];
}

export function curveCut(t: TrimSawType): boolean {
  const m: Record<TrimSawType, boolean> = {
    diamond_blade_thin: false, sintered_rim_wet: false, notched_rim_dry: false, wire_blade_scroll: true, band_saw_continuous: true,
  };
  return m[t];
}

export function bladeType(t: TrimSawType): string {
  const m: Record<TrimSawType, string> = {
    diamond_blade_thin: "electroplated_diamond",
    sintered_rim_wet: "sintered_diamond_metal",
    notched_rim_dry: "segmented_diamond_dry",
    wire_blade_scroll: "diamond_wire_loop",
    band_saw_continuous: "continuous_diamond_band",
  };
  return m[t];
}

export function bestUse(t: TrimSawType): string {
  const m: Record<TrimSawType, string> = {
    diamond_blade_thin: "slab_trim_precise",
    sintered_rim_wet: "heavy_rough_cut",
    notched_rim_dry: "field_cut_portable",
    wire_blade_scroll: "intricate_shape_cut",
    band_saw_continuous: "production_volume_cut",
  };
  return m[t];
}

export function trimSaws(): TrimSawType[] {
  return ["diamond_blade_thin", "sintered_rim_wet", "notched_rim_dry", "wire_blade_scroll", "band_saw_continuous"];
}
