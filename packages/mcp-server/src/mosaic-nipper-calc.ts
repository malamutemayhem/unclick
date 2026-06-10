export type MosaicNipperType = "wheeled_cutter_dual" | "compound_lever_heavy" | "running_plier_snap" | "glass_scorer_carbide" | "side_bite_flat";

export function cutPrecision(t: MosaicNipperType): number {
  const m: Record<MosaicNipperType, number> = {
    wheeled_cutter_dual: 10, compound_lever_heavy: 6, running_plier_snap: 7, glass_scorer_carbide: 9, side_bite_flat: 5,
  };
  return m[t];
}

export function cutForce(t: MosaicNipperType): number {
  const m: Record<MosaicNipperType, number> = {
    wheeled_cutter_dual: 7, compound_lever_heavy: 10, running_plier_snap: 6, glass_scorer_carbide: 5, side_bite_flat: 8,
  };
  return m[t];
}

export function handFatigue(t: MosaicNipperType): number {
  const m: Record<MosaicNipperType, number> = {
    wheeled_cutter_dual: 9, compound_lever_heavy: 6, running_plier_snap: 8, glass_scorer_carbide: 7, side_bite_flat: 4,
  };
  return m[t];
}

export function chipControl(t: MosaicNipperType): number {
  const m: Record<MosaicNipperType, number> = {
    wheeled_cutter_dual: 9, compound_lever_heavy: 5, running_plier_snap: 8, glass_scorer_carbide: 10, side_bite_flat: 6,
  };
  return m[t];
}

export function nipperCost(t: MosaicNipperType): number {
  const m: Record<MosaicNipperType, number> = {
    wheeled_cutter_dual: 3, compound_lever_heavy: 2, running_plier_snap: 2, glass_scorer_carbide: 2, side_bite_flat: 1,
  };
  return m[t];
}

export function wheelBlade(t: MosaicNipperType): boolean {
  const m: Record<MosaicNipperType, boolean> = {
    wheeled_cutter_dual: true, compound_lever_heavy: false, running_plier_snap: false, glass_scorer_carbide: false, side_bite_flat: false,
  };
  return m[t];
}

export function forThickGlass(t: MosaicNipperType): boolean {
  const m: Record<MosaicNipperType, boolean> = {
    wheeled_cutter_dual: false, compound_lever_heavy: true, running_plier_snap: false, glass_scorer_carbide: false, side_bite_flat: true,
  };
  return m[t];
}

export function jawType(t: MosaicNipperType): string {
  const m: Record<MosaicNipperType, string> = {
    wheeled_cutter_dual: "carbide_wheel_pair",
    compound_lever_heavy: "hardened_steel_jaw",
    running_plier_snap: "curved_break_jaw",
    glass_scorer_carbide: "single_carbide_wheel",
    side_bite_flat: "flat_edge_bite",
  };
  return m[t];
}

export function bestUse(t: MosaicNipperType): string {
  const m: Record<MosaicNipperType, string> = {
    wheeled_cutter_dual: "precise_tesserae_cut",
    compound_lever_heavy: "thick_smalti_break",
    running_plier_snap: "scored_line_snap",
    glass_scorer_carbide: "straight_score_line",
    side_bite_flat: "rough_shape_trim",
  };
  return m[t];
}

export function mosaicNippers(): MosaicNipperType[] {
  return ["wheeled_cutter_dual", "compound_lever_heavy", "running_plier_snap", "glass_scorer_carbide", "side_bite_flat"];
}
