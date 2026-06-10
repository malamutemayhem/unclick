export type GougeCarveType = "straight_gouge_flat" | "spoon_gouge_hollow" | "v_parting_line" | "fishtail_gouge_clean" | "back_bent_undercut";

export function cuttingDepth(t: GougeCarveType): number {
  const m: Record<GougeCarveType, number> = {
    straight_gouge_flat: 8, spoon_gouge_hollow: 9, v_parting_line: 6, fishtail_gouge_clean: 5, back_bent_undercut: 7,
  };
  return m[t];
}

export function detailWork(t: GougeCarveType): number {
  const m: Record<GougeCarveType, number> = {
    straight_gouge_flat: 6, spoon_gouge_hollow: 7, v_parting_line: 10, fishtail_gouge_clean: 9, back_bent_undercut: 8,
  };
  return m[t];
}

export function versatility(t: GougeCarveType): number {
  const m: Record<GougeCarveType, number> = {
    straight_gouge_flat: 10, spoon_gouge_hollow: 7, v_parting_line: 6, fishtail_gouge_clean: 8, back_bent_undercut: 5,
  };
  return m[t];
}

export function sharpenEase(t: GougeCarveType): number {
  const m: Record<GougeCarveType, number> = {
    straight_gouge_flat: 9, spoon_gouge_hollow: 4, v_parting_line: 6, fishtail_gouge_clean: 7, back_bent_undercut: 3,
  };
  return m[t];
}

export function gougeCost(t: GougeCarveType): number {
  const m: Record<GougeCarveType, number> = {
    straight_gouge_flat: 2, spoon_gouge_hollow: 3, v_parting_line: 2, fishtail_gouge_clean: 3, back_bent_undercut: 4,
  };
  return m[t];
}

export function forRelief(t: GougeCarveType): boolean {
  const m: Record<GougeCarveType, boolean> = {
    straight_gouge_flat: true, spoon_gouge_hollow: true, v_parting_line: true, fishtail_gouge_clean: true, back_bent_undercut: false,
  };
  return m[t];
}

export function curveBlade(t: GougeCarveType): boolean {
  const m: Record<GougeCarveType, boolean> = {
    straight_gouge_flat: false, spoon_gouge_hollow: true, v_parting_line: false, fishtail_gouge_clean: false, back_bent_undercut: true,
  };
  return m[t];
}

export function bladeProfile(t: GougeCarveType): string {
  const m: Record<GougeCarveType, string> = {
    straight_gouge_flat: "u_sweep_straight",
    spoon_gouge_hollow: "curved_spoon_bowl",
    v_parting_line: "v_groove_angle",
    fishtail_gouge_clean: "flared_tail_edge",
    back_bent_undercut: "reverse_curve_hook",
  };
  return m[t];
}

export function bestCarve(t: GougeCarveType): string {
  const m: Record<GougeCarveType, string> = {
    straight_gouge_flat: "general_rough_shape",
    spoon_gouge_hollow: "bowl_concave_hollow",
    v_parting_line: "outline_letter_line",
    fishtail_gouge_clean: "corner_cleanup_flat",
    back_bent_undercut: "undercut_relief_lip",
  };
  return m[t];
}

export function gougeCarves(): GougeCarveType[] {
  return ["straight_gouge_flat", "spoon_gouge_hollow", "v_parting_line", "fishtail_gouge_clean", "back_bent_undercut"];
}
