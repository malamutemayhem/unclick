export type BroomType = "corn_straw_traditional" | "angle_cut_indoor" | "push_broom_wide" | "rubber_bristle_pet" | "electric_sweeper_cordless";

export function sweepPower(t: BroomType): number {
  const m: Record<BroomType, number> = {
    corn_straw_traditional: 6, angle_cut_indoor: 7, push_broom_wide: 9, rubber_bristle_pet: 8, electric_sweeper_cordless: 10,
  };
  return m[t];
}

export function fineDebris(t: BroomType): number {
  const m: Record<BroomType, number> = {
    corn_straw_traditional: 5, angle_cut_indoor: 9, push_broom_wide: 4, rubber_bristle_pet: 7, electric_sweeper_cordless: 10,
  };
  return m[t];
}

export function durability(t: BroomType): number {
  const m: Record<BroomType, number> = {
    corn_straw_traditional: 4, angle_cut_indoor: 7, push_broom_wide: 8, rubber_bristle_pet: 9, electric_sweeper_cordless: 6,
  };
  return m[t];
}

export function cornerReach(t: BroomType): number {
  const m: Record<BroomType, number> = {
    corn_straw_traditional: 5, angle_cut_indoor: 10, push_broom_wide: 2, rubber_bristle_pet: 6, electric_sweeper_cordless: 7,
  };
  return m[t];
}

export function broomCost(t: BroomType): number {
  const m: Record<BroomType, number> = {
    corn_straw_traditional: 2, angle_cut_indoor: 3, push_broom_wide: 4, rubber_bristle_pet: 5, electric_sweeper_cordless: 8,
  };
  return m[t];
}

export function washable(t: BroomType): boolean {
  const m: Record<BroomType, boolean> = {
    corn_straw_traditional: false, angle_cut_indoor: true, push_broom_wide: true, rubber_bristle_pet: true, electric_sweeper_cordless: false,
  };
  return m[t];
}

export function needsPower(t: BroomType): boolean {
  const m: Record<BroomType, boolean> = {
    corn_straw_traditional: false, angle_cut_indoor: false, push_broom_wide: false, rubber_bristle_pet: false, electric_sweeper_cordless: true,
  };
  return m[t];
}

export function bristleType(t: BroomType): string {
  const m: Record<BroomType, string> = {
    corn_straw_traditional: "natural_corn_husk_stiff",
    angle_cut_indoor: "flagged_poly_angle_tip",
    push_broom_wide: "stiff_palmyra_fiber",
    rubber_bristle_pet: "natural_rubber_electrostatic",
    electric_sweeper_cordless: "rotating_brush_roller",
  };
  return m[t];
}

export function bestSurface(t: BroomType): string {
  const m: Record<BroomType, string> = {
    corn_straw_traditional: "workshop_rough_concrete",
    angle_cut_indoor: "kitchen_hardwood_tile",
    push_broom_wide: "garage_driveway_wide",
    rubber_bristle_pet: "carpet_pet_hair_pickup",
    electric_sweeper_cordless: "quick_daily_all_floor",
  };
  return m[t];
}

export function brooms(): BroomType[] {
  return ["corn_straw_traditional", "angle_cut_indoor", "push_broom_wide", "rubber_bristle_pet", "electric_sweeper_cordless"];
}
