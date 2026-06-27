export type ScriberType = "carbide_tip_single" | "double_end_bent" | "pocket_clip_retract" | "surface_gauge_mount" | "height_gauge_scribe";

export function lineFineness(t: ScriberType): number {
  const m: Record<ScriberType, number> = {
    carbide_tip_single: 9, double_end_bent: 7, pocket_clip_retract: 6, surface_gauge_mount: 8, height_gauge_scribe: 10,
  };
  return m[t];
}

export function hardSurface(t: ScriberType): number {
  const m: Record<ScriberType, number> = {
    carbide_tip_single: 10, double_end_bent: 7, pocket_clip_retract: 5, surface_gauge_mount: 8, height_gauge_scribe: 9,
  };
  return m[t];
}

export function reachAngle(t: ScriberType): number {
  const m: Record<ScriberType, number> = {
    carbide_tip_single: 5, double_end_bent: 10, pocket_clip_retract: 6, surface_gauge_mount: 8, height_gauge_scribe: 7,
  };
  return m[t];
}

export function portability(t: ScriberType): number {
  const m: Record<ScriberType, number> = {
    carbide_tip_single: 8, double_end_bent: 7, pocket_clip_retract: 10, surface_gauge_mount: 3, height_gauge_scribe: 2,
  };
  return m[t];
}

export function scriberCost(t: ScriberType): number {
  const m: Record<ScriberType, number> = {
    carbide_tip_single: 1, double_end_bent: 1, pocket_clip_retract: 1, surface_gauge_mount: 2, height_gauge_scribe: 3,
  };
  return m[t];
}

export function retractable(t: ScriberType): boolean {
  const m: Record<ScriberType, boolean> = {
    carbide_tip_single: false, double_end_bent: false, pocket_clip_retract: true, surface_gauge_mount: false, height_gauge_scribe: false,
  };
  return m[t];
}

export function gaugeMounted(t: ScriberType): boolean {
  const m: Record<ScriberType, boolean> = {
    carbide_tip_single: false, double_end_bent: false, pocket_clip_retract: false, surface_gauge_mount: true, height_gauge_scribe: true,
  };
  return m[t];
}

export function tipMaterial(t: ScriberType): string {
  const m: Record<ScriberType, string> = {
    carbide_tip_single: "tungsten_carbide_point",
    double_end_bent: "hardened_steel_bent",
    pocket_clip_retract: "steel_retract_point",
    surface_gauge_mount: "carbide_gauge_tip",
    height_gauge_scribe: "carbide_precision_tip",
  };
  return m[t];
}

export function bestUse(t: ScriberType): string {
  const m: Record<ScriberType, string> = {
    carbide_tip_single: "metal_line_scribe",
    double_end_bent: "hard_reach_mark",
    pocket_clip_retract: "pocket_carry_mark",
    surface_gauge_mount: "surface_plate_layout",
    height_gauge_scribe: "precision_height_mark",
  };
  return m[t];
}

export function scribers(): ScriberType[] {
  return ["carbide_tip_single", "double_end_bent", "pocket_clip_retract", "surface_gauge_mount", "height_gauge_scribe"];
}
