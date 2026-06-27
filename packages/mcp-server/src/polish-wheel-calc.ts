export type PolishWheelType = "muslin_buff_soft" | "felt_hard_flat" | "cotton_flannel_shine" | "sisal_cord_cut" | "goblet_cone_inner";

export function polishRate(t: PolishWheelType): number {
  const m: Record<PolishWheelType, number> = {
    muslin_buff_soft: 8, felt_hard_flat: 7, cotton_flannel_shine: 9, sisal_cord_cut: 10, goblet_cone_inner: 6,
  };
  return m[t];
}

export function surfaceSafe(t: PolishWheelType): number {
  const m: Record<PolishWheelType, number> = {
    muslin_buff_soft: 9, felt_hard_flat: 6, cotton_flannel_shine: 10, sisal_cord_cut: 4, goblet_cone_inner: 7,
  };
  return m[t];
}

export function compoundHold(t: PolishWheelType): number {
  const m: Record<PolishWheelType, number> = {
    muslin_buff_soft: 7, felt_hard_flat: 9, cotton_flannel_shine: 6, sisal_cord_cut: 10, goblet_cone_inner: 8,
  };
  return m[t];
}

export function wheelLife(t: PolishWheelType): number {
  const m: Record<PolishWheelType, number> = {
    muslin_buff_soft: 5, felt_hard_flat: 9, cotton_flannel_shine: 4, sisal_cord_cut: 8, goblet_cone_inner: 7,
  };
  return m[t];
}

export function wheelCost(t: PolishWheelType): number {
  const m: Record<PolishWheelType, number> = {
    muslin_buff_soft: 1, felt_hard_flat: 2, cotton_flannel_shine: 1, sisal_cord_cut: 2, goblet_cone_inner: 3,
  };
  return m[t];
}

export function forFinalShine(t: PolishWheelType): boolean {
  const m: Record<PolishWheelType, boolean> = {
    muslin_buff_soft: true, felt_hard_flat: false, cotton_flannel_shine: true, sisal_cord_cut: false, goblet_cone_inner: false,
  };
  return m[t];
}

export function forCutting(t: PolishWheelType): boolean {
  const m: Record<PolishWheelType, boolean> = {
    muslin_buff_soft: false, felt_hard_flat: false, cotton_flannel_shine: false, sisal_cord_cut: true, goblet_cone_inner: false,
  };
  return m[t];
}

export function wheelFabric(t: PolishWheelType): string {
  const m: Record<PolishWheelType, string> = {
    muslin_buff_soft: "loose_muslin_cotton",
    felt_hard_flat: "compressed_wool_felt",
    cotton_flannel_shine: "stitched_flannel_cotton",
    sisal_cord_cut: "woven_sisal_hemp",
    goblet_cone_inner: "shaped_felt_cone",
  };
  return m[t];
}

export function bestStage(t: PolishWheelType): string {
  const m: Record<PolishWheelType, string> = {
    muslin_buff_soft: "final_mirror_buff",
    felt_hard_flat: "flat_surface_polish",
    cotton_flannel_shine: "high_luster_finish",
    sisal_cord_cut: "initial_cut_compound",
    goblet_cone_inner: "ring_inner_polish",
  };
  return m[t];
}

export function polishWheels(): PolishWheelType[] {
  return ["muslin_buff_soft", "felt_hard_flat", "cotton_flannel_shine", "sisal_cord_cut", "goblet_cone_inner"];
}
