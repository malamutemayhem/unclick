export type KumihimoType = "round_foam_disk" | "square_plate_flat" | "marudai_wood_stand" | "takadai_frame_braid" | "kongo_gumi_stand";

export function cordRound(t: KumihimoType): number {
  const m: Record<KumihimoType, number> = {
    round_foam_disk: 9, square_plate_flat: 5, marudai_wood_stand: 10, takadai_frame_braid: 4, kongo_gumi_stand: 8,
  };
  return m[t];
}

export function patternRange(t: KumihimoType): number {
  const m: Record<KumihimoType, number> = {
    round_foam_disk: 6, square_plate_flat: 7, marudai_wood_stand: 9, takadai_frame_braid: 10, kongo_gumi_stand: 8,
  };
  return m[t];
}

export function portability(t: KumihimoType): number {
  const m: Record<KumihimoType, number> = {
    round_foam_disk: 10, square_plate_flat: 9, marudai_wood_stand: 3, takadai_frame_braid: 2, kongo_gumi_stand: 4,
  };
  return m[t];
}

export function tensionControl(t: KumihimoType): number {
  const m: Record<KumihimoType, number> = {
    round_foam_disk: 5, square_plate_flat: 6, marudai_wood_stand: 10, takadai_frame_braid: 9, kongo_gumi_stand: 8,
  };
  return m[t];
}

export function braidCost(t: KumihimoType): number {
  const m: Record<KumihimoType, number> = {
    round_foam_disk: 1, square_plate_flat: 1, marudai_wood_stand: 5, takadai_frame_braid: 5, kongo_gumi_stand: 4,
  };
  return m[t];
}

export function forBeginner(t: KumihimoType): boolean {
  const m: Record<KumihimoType, boolean> = {
    round_foam_disk: true, square_plate_flat: true, marudai_wood_stand: false, takadai_frame_braid: false, kongo_gumi_stand: false,
  };
  return m[t];
}

export function freestanding(t: KumihimoType): boolean {
  const m: Record<KumihimoType, boolean> = {
    round_foam_disk: false, square_plate_flat: false, marudai_wood_stand: true, takadai_frame_braid: true, kongo_gumi_stand: true,
  };
  return m[t];
}

export function braidMaterial(t: KumihimoType): string {
  const m: Record<KumihimoType, string> = {
    round_foam_disk: "eva_foam_notched",
    square_plate_flat: "cardboard_or_foam",
    marudai_wood_stand: "hardwood_mirror_top",
    takadai_frame_braid: "wood_frame_heddle",
    kongo_gumi_stand: "wood_stand_weighted",
  };
  return m[t];
}

export function bestUse(t: KumihimoType): string {
  const m: Record<KumihimoType, string> = {
    round_foam_disk: "simple_round_braid",
    square_plate_flat: "flat_square_braid",
    marudai_wood_stand: "traditional_silk_braid",
    takadai_frame_braid: "flat_complex_pattern",
    kongo_gumi_stand: "tubular_braid_large",
  };
  return m[t];
}

export function kumihimoTools(): KumihimoType[] {
  return ["round_foam_disk", "square_plate_flat", "marudai_wood_stand", "takadai_frame_braid", "kongo_gumi_stand"];
}
