export type BradAwlType = "birdcage_twist_point" | "straight_diamond_tip" | "square_blade_pilot" | "round_scratch_mark" | "tapered_brad_push";

export function holeStart(t: BradAwlType): number {
  const m: Record<BradAwlType, number> = {
    birdcage_twist_point: 9, straight_diamond_tip: 8, square_blade_pilot: 7, round_scratch_mark: 5, tapered_brad_push: 6,
  };
  return m[t];
}

export function markClarity(t: BradAwlType): number {
  const m: Record<BradAwlType, number> = {
    birdcage_twist_point: 6, straight_diamond_tip: 9, square_blade_pilot: 7, round_scratch_mark: 10, tapered_brad_push: 5,
  };
  return m[t];
}

export function woodSplit(t: BradAwlType): number {
  const m: Record<BradAwlType, number> = {
    birdcage_twist_point: 3, straight_diamond_tip: 5, square_blade_pilot: 8, round_scratch_mark: 2, tapered_brad_push: 7,
  };
  return m[t];
}

export function handleGrip(t: BradAwlType): number {
  const m: Record<BradAwlType, number> = {
    birdcage_twist_point: 8, straight_diamond_tip: 7, square_blade_pilot: 9, round_scratch_mark: 6, tapered_brad_push: 8,
  };
  return m[t];
}

export function awlCost(t: BradAwlType): number {
  const m: Record<BradAwlType, number> = {
    birdcage_twist_point: 2, straight_diamond_tip: 1, square_blade_pilot: 2, round_scratch_mark: 1, tapered_brad_push: 1,
  };
  return m[t];
}

export function twistAction(t: BradAwlType): boolean {
  const m: Record<BradAwlType, boolean> = {
    birdcage_twist_point: true, straight_diamond_tip: false, square_blade_pilot: false, round_scratch_mark: false, tapered_brad_push: false,
  };
  return m[t];
}

export function forScrew(t: BradAwlType): boolean {
  const m: Record<BradAwlType, boolean> = {
    birdcage_twist_point: true, straight_diamond_tip: false, square_blade_pilot: true, round_scratch_mark: false, tapered_brad_push: false,
  };
  return m[t];
}

export function tipProfile(t: BradAwlType): string {
  const m: Record<BradAwlType, string> = {
    birdcage_twist_point: "twisted_flute_point",
    straight_diamond_tip: "diamond_cross_section",
    square_blade_pilot: "square_tapered_blade",
    round_scratch_mark: "round_needle_point",
    tapered_brad_push: "round_tapered_push",
  };
  return m[t];
}

export function bestUse(t: BradAwlType): string {
  const m: Record<BradAwlType, string> = {
    birdcage_twist_point: "screw_pilot_twist",
    straight_diamond_tip: "mark_cross_line",
    square_blade_pilot: "hinge_screw_start",
    round_scratch_mark: "layout_scratch_mark",
    tapered_brad_push: "brad_nail_start",
  };
  return m[t];
}

export function bradAwls(): BradAwlType[] {
  return ["birdcage_twist_point", "straight_diamond_tip", "square_blade_pilot", "round_scratch_mark", "tapered_brad_push"];
}
