export type QuiverType = "back_quiver_traditional" | "hip_quiver_field" | "bow_mounted_compact" | "ground_quiver_target" | "pocket_quiver_belt";

export function arrowCapacity(t: QuiverType): number {
  const m: Record<QuiverType, number> = {
    back_quiver_traditional: 9, hip_quiver_field: 7, bow_mounted_compact: 4, ground_quiver_target: 10, pocket_quiver_belt: 5,
  };
  return m[t];
}

export function accessibility(t: QuiverType): number {
  const m: Record<QuiverType, number> = {
    back_quiver_traditional: 6, hip_quiver_field: 9, bow_mounted_compact: 7, ground_quiver_target: 10, pocket_quiver_belt: 8,
  };
  return m[t];
}

export function portability(t: QuiverType): number {
  const m: Record<QuiverType, number> = {
    back_quiver_traditional: 7, hip_quiver_field: 8, bow_mounted_compact: 10, ground_quiver_target: 3, pocket_quiver_belt: 9,
  };
  return m[t];
}

export function fletchingProtection(t: QuiverType): number {
  const m: Record<QuiverType, number> = {
    back_quiver_traditional: 7, hip_quiver_field: 8, bow_mounted_compact: 6, ground_quiver_target: 10, pocket_quiver_belt: 5,
  };
  return m[t];
}

export function quiverCost(t: QuiverType): number {
  const m: Record<QuiverType, number> = {
    back_quiver_traditional: 7, hip_quiver_field: 5, bow_mounted_compact: 6, ground_quiver_target: 8, pocket_quiver_belt: 4,
  };
  return m[t];
}

export function handsFree(t: QuiverType): boolean {
  const m: Record<QuiverType, boolean> = {
    back_quiver_traditional: true, hip_quiver_field: true, bow_mounted_compact: true, ground_quiver_target: false, pocket_quiver_belt: true,
  };
  return m[t];
}

export function adjustableAngle(t: QuiverType): boolean {
  const m: Record<QuiverType, boolean> = {
    back_quiver_traditional: false, hip_quiver_field: true, bow_mounted_compact: true, ground_quiver_target: true, pocket_quiver_belt: false,
  };
  return m[t];
}

export function quiverMaterial(t: QuiverType): string {
  const m: Record<QuiverType, string> = {
    back_quiver_traditional: "leather_rawhide_stitched",
    hip_quiver_field: "cordura_nylon_padded",
    bow_mounted_compact: "injection_molded_polymer",
    ground_quiver_target: "aluminum_tube_anodized",
    pocket_quiver_belt: "canvas_belt_loop",
  };
  return m[t];
}

export function bestStyle(t: QuiverType): string {
  const m: Record<QuiverType, string> = {
    back_quiver_traditional: "traditional_longbow_instinctive",
    hip_quiver_field: "field_archery_3d_course",
    bow_mounted_compact: "compound_hunting_treestand",
    ground_quiver_target: "olympic_target_indoor",
    pocket_quiver_belt: "casual_practice_range",
  };
  return m[t];
}

export function quivers(): QuiverType[] {
  return ["back_quiver_traditional", "hip_quiver_field", "bow_mounted_compact", "ground_quiver_target", "pocket_quiver_belt"];
}
