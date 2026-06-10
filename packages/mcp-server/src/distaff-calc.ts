export type DistaffType = "floor_stand_tall" | "belt_clip_portable" | "wrist_strap_hand" | "lantern_cage_hold" | "cup_top_Russian";

export function fiberHold(t: DistaffType): number {
  const m: Record<DistaffType, number> = {
    floor_stand_tall: 10, belt_clip_portable: 6, wrist_strap_hand: 5, lantern_cage_hold: 8, cup_top_Russian: 9,
  };
  return m[t];
}

export function draftAccess(t: DistaffType): number {
  const m: Record<DistaffType, number> = {
    floor_stand_tall: 8, belt_clip_portable: 9, wrist_strap_hand: 7, lantern_cage_hold: 6, cup_top_Russian: 10,
  };
  return m[t];
}

export function portability(t: DistaffType): number {
  const m: Record<DistaffType, number> = {
    floor_stand_tall: 2, belt_clip_portable: 10, wrist_strap_hand: 9, lantern_cage_hold: 5, cup_top_Russian: 4,
  };
  return m[t];
}

export function fiberVariety(t: DistaffType): number {
  const m: Record<DistaffType, number> = {
    floor_stand_tall: 8, belt_clip_portable: 6, wrist_strap_hand: 5, lantern_cage_hold: 9, cup_top_Russian: 10,
  };
  return m[t];
}

export function distaffCost(t: DistaffType): number {
  const m: Record<DistaffType, number> = {
    floor_stand_tall: 2, belt_clip_portable: 1, wrist_strap_hand: 1, lantern_cage_hold: 2, cup_top_Russian: 2,
  };
  return m[t];
}

export function freestanding(t: DistaffType): boolean {
  const m: Record<DistaffType, boolean> = {
    floor_stand_tall: true, belt_clip_portable: false, wrist_strap_hand: false, lantern_cage_hold: true, cup_top_Russian: false,
  };
  return m[t];
}

export function forFlax(t: DistaffType): boolean {
  const m: Record<DistaffType, boolean> = {
    floor_stand_tall: true, belt_clip_portable: true, wrist_strap_hand: false, lantern_cage_hold: false, cup_top_Russian: true,
  };
  return m[t];
}

export function mountType(t: DistaffType): string {
  const m: Record<DistaffType, string> = {
    floor_stand_tall: "floor_stand_pole",
    belt_clip_portable: "belt_hook_clip",
    wrist_strap_hand: "wrist_loop_strap",
    lantern_cage_hold: "cage_frame_stand",
    cup_top_Russian: "cup_top_post",
  };
  return m[t];
}

export function bestUse(t: DistaffType): string {
  const m: Record<DistaffType, string> = {
    floor_stand_tall: "wheel_flax_spin",
    belt_clip_portable: "walk_spin_mobile",
    wrist_strap_hand: "drop_spindle_aid",
    lantern_cage_hold: "loose_fiber_contain",
    cup_top_Russian: "long_fiber_control",
  };
  return m[t];
}

export function distaffs(): DistaffType[] {
  return ["floor_stand_tall", "belt_clip_portable", "wrist_strap_hand", "lantern_cage_hold", "cup_top_Russian"];
}
