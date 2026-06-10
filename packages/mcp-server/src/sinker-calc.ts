export type SinkerType = "split_shot_removable" | "bullet_worm_weight" | "egg_sinker_sliding" | "bank_sinker_anchor" | "tungsten_drop_shot";

export function sinkRate(t: SinkerType): number {
  const m: Record<SinkerType, number> = {
    split_shot_removable: 4, bullet_worm_weight: 6, egg_sinker_sliding: 7, bank_sinker_anchor: 9, tungsten_drop_shot: 10,
  };
  return m[t];
}

export function snagResist(t: SinkerType): number {
  const m: Record<SinkerType, number> = {
    split_shot_removable: 6, bullet_worm_weight: 9, egg_sinker_sliding: 7, bank_sinker_anchor: 4, tungsten_drop_shot: 8,
  };
  return m[t];
}

export function sensitivity(t: SinkerType): number {
  const m: Record<SinkerType, number> = {
    split_shot_removable: 5, bullet_worm_weight: 7, egg_sinker_sliding: 6, bank_sinker_anchor: 4, tungsten_drop_shot: 10,
  };
  return m[t];
}

export function versatility(t: SinkerType): number {
  const m: Record<SinkerType, number> = {
    split_shot_removable: 10, bullet_worm_weight: 7, egg_sinker_sliding: 8, bank_sinker_anchor: 5, tungsten_drop_shot: 6,
  };
  return m[t];
}

export function sinkerCost(t: SinkerType): number {
  const m: Record<SinkerType, number> = {
    split_shot_removable: 2, bullet_worm_weight: 3, egg_sinker_sliding: 3, bank_sinker_anchor: 4, tungsten_drop_shot: 9,
  };
  return m[t];
}

export function leadFree(t: SinkerType): boolean {
  const m: Record<SinkerType, boolean> = {
    split_shot_removable: false, bullet_worm_weight: false, egg_sinker_sliding: false, bank_sinker_anchor: false, tungsten_drop_shot: true,
  };
  return m[t];
}

export function reusable(t: SinkerType): boolean {
  const m: Record<SinkerType, boolean> = {
    split_shot_removable: true, bullet_worm_weight: true, egg_sinker_sliding: true, bank_sinker_anchor: true, tungsten_drop_shot: true,
  };
  return m[t];
}

export function sinkerShape(t: SinkerType): string {
  const m: Record<SinkerType, string> = {
    split_shot_removable: "round_pinch_crimp",
    bullet_worm_weight: "bullet_cone_streamline",
    egg_sinker_sliding: "oval_egg_center_hole",
    bank_sinker_anchor: "pyramid_flat_bottom",
    tungsten_drop_shot: "cylinder_small_dense",
  };
  return m[t];
}

export function bestRig(t: SinkerType): string {
  const m: Record<SinkerType, string> = {
    split_shot_removable: "float_rig_panfish",
    bullet_worm_weight: "texas_rig_bass",
    egg_sinker_sliding: "carolina_rig_catfish",
    bank_sinker_anchor: "surf_rig_bottom_hold",
    tungsten_drop_shot: "drop_shot_finesse",
  };
  return m[t];
}

export function sinkers(): SinkerType[] {
  return ["split_shot_removable", "bullet_worm_weight", "egg_sinker_sliding", "bank_sinker_anchor", "tungsten_drop_shot"];
}
