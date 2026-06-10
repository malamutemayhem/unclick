export type PorchSwingType = "wood_slat_classic" | "wicker_resin_curved" | "daybed_canopy_cushion" | "porch_bed_hanging" | "metal_glider_frame";

export function comfort(t: PorchSwingType): number {
  const m: Record<PorchSwingType, number> = {
    wood_slat_classic: 6, wicker_resin_curved: 7, daybed_canopy_cushion: 10, porch_bed_hanging: 9, metal_glider_frame: 7,
  };
  return m[t];
}

export function seatCapacity(t: PorchSwingType): number {
  const m: Record<PorchSwingType, number> = {
    wood_slat_classic: 5, wicker_resin_curved: 5, daybed_canopy_cushion: 7, porch_bed_hanging: 9, metal_glider_frame: 6,
  };
  return m[t];
}

export function weatherResist(t: PorchSwingType): number {
  const m: Record<PorchSwingType, number> = {
    wood_slat_classic: 5, wicker_resin_curved: 8, daybed_canopy_cushion: 4, porch_bed_hanging: 3, metal_glider_frame: 7,
  };
  return m[t];
}

export function installEase(t: PorchSwingType): number {
  const m: Record<PorchSwingType, number> = {
    wood_slat_classic: 6, wicker_resin_curved: 5, daybed_canopy_cushion: 4, porch_bed_hanging: 3, metal_glider_frame: 8,
  };
  return m[t];
}

export function swingCost(t: PorchSwingType): number {
  const m: Record<PorchSwingType, number> = {
    wood_slat_classic: 4, wicker_resin_curved: 5, daybed_canopy_cushion: 8, porch_bed_hanging: 9, metal_glider_frame: 5,
  };
  return m[t];
}

export function needsCeiling(t: PorchSwingType): boolean {
  const m: Record<PorchSwingType, boolean> = {
    wood_slat_classic: true, wicker_resin_curved: true, daybed_canopy_cushion: true, porch_bed_hanging: true, metal_glider_frame: false,
  };
  return m[t];
}

export function hasCanopy(t: PorchSwingType): boolean {
  const m: Record<PorchSwingType, boolean> = {
    wood_slat_classic: false, wicker_resin_curved: false, daybed_canopy_cushion: true, porch_bed_hanging: false, metal_glider_frame: false,
  };
  return m[t];
}

export function frameType(t: PorchSwingType): string {
  const m: Record<PorchSwingType, string> = {
    wood_slat_classic: "cedar_pine_slat_chain",
    wicker_resin_curved: "wicker_resin_rope_hang",
    daybed_canopy_cushion: "steel_frame_canopy_top",
    porch_bed_hanging: "wood_platform_rope_mount",
    metal_glider_frame: "steel_a_frame_glide",
  };
  return m[t];
}

export function bestSpot(t: PorchSwingType): string {
  const m: Record<PorchSwingType, string> = {
    wood_slat_classic: "covered_porch_veranda",
    wicker_resin_curved: "screened_porch_sunroom",
    daybed_canopy_cushion: "garden_patio_retreat",
    porch_bed_hanging: "deep_porch_sleeping",
    metal_glider_frame: "open_patio_no_ceiling",
  };
  return m[t];
}

export function porchSwings(): PorchSwingType[] {
  return ["wood_slat_classic", "wicker_resin_curved", "daybed_canopy_cushion", "porch_bed_hanging", "metal_glider_frame"];
}
